from __future__ import print_function
import io
import os

from box import Box, BoxList
from PIL import Image
import requests
import yaml


# https://stackoverflow.com/questions/25108581/python-yaml-dump-bad-indentation
class MyDumper(yaml.Dumper):

    def increase_indent(self, flow=False, indentless=False):
        return super(MyDumper, self).increase_indent(flow, False)


def remove_file(f):
    try:
        print('removing file', f)
        os.remove(f)
    except OSError:
        pass


def download_file(url, output_file):
    response = requests.get(url)
    with open(output_file, 'wb') as f:
        f.write(response.content)
    return response


def write_yaml_file(data, output_file):
    with open(output_file, "a") as f:
        yaml.dump(data, f, Dumper=MyDumper, default_flow_style=False)


def create_dirs(dir):
    """Create directory and all intermediate-level directories"""
    if not os.path.isdir(dir):
        os.makedirs(dir)


def get_categories(slackmojis):
    categories = set()
    categories.add('uncategorized')
    for slackmoji in slackmojis:
        if 'category' in slackmoji:
            category = str(slackmoji.category.name).lower().replace(' ', '-')
            categories.add(category)
    return categories


def main():
    url = "http://slackmojis.com/emojis.json"
    output_file = 'emojis.json'

    remove_file(output_file)
    download_file(url, output_file)

    # for downloaded emoji
    slackmoji_dl_dir = 'downloaded'
    create_dirs(slackmoji_dl_dir)

    slackmoji_pack_dir = 'slackmoji-packs'
    create_dirs(slackmoji_pack_dir)

    slackmojis = BoxList.from_json(filename=output_file)

    categories = get_categories(slackmojis)

    data = {}
    for category in categories:
        data[category] = {'emojis': []}
        output_file_yaml = os.path.join(slackmoji_pack_dir,
                                        'slackmojis-{}.yaml'.format(category))
        remove_file(output_file_yaml)

        data_header = {
            'title': 'slackmoji-{}'.format(category)
            }
        write_yaml_file(data_header, output_file_yaml)

    name_count = Box()
    for slackmoji in slackmojis:
        name = str(slackmoji['name'])
        category = 'uncategorized'
        if 'category' in slackmoji:
            category = str(slackmoji.category.name).lower().replace(' ', '-')

        output_file_yaml = os.path.join(slackmoji_pack_dir,
                                        'slackmojis-{}.yaml'.format(category))

        # Special cases - a.k.a stupid cases
        if name == 'yes2':
            # there are two 'yes' and one 'yes2' emojis already
            name = 'yes2-1'
        if name == 'no2':
            # there are two 'no' and one 'no2' emojis already
            name = 'no2-1'
        sports = ['mlb', 'nba', 'nfl', 'nhl']
        if category in sports:
            # The NFL logo should not be :nfl-nfl:
            if name == 'nfl':
                pass
            else:
                name = '{}-{}'.format(category, name)

        name_count.name = name_count.name + 1 if name in name_count else 1
        if name_count.name > 1:
            name = ''.join([name, str(name_count.name)])
        src = str(slackmoji['image_url']).split('?')[0]
        ext = os.path.splitext(src)[1]

        # the downloaded filename is different from if you download it manually
        # because of the possible duplicates
        dl_file = os.path.join(slackmoji_dl_dir, ''.join([name, ext]))
        if os.path.isfile(dl_file):
            with open(dl_file) as f:
                body = f.read()
        else:
            response = download_file(src, dl_file)
            body = response.content
        with io.BytesIO(body) as f:
            # Is it an image?
            im = Image.open(f)
            if im.width > 128 or im.height > 128:
                print(':{}: is {}\t{}'.format(name, im.size, src))
                continue

        slackmoji_data = {
            'name': name,
            'src': src
        }

        data[category]['emojis'].append(slackmoji_data)

    for category in categories:
        output_file_yaml = os.path.join(slackmoji_pack_dir,
                                        'slackmojis-{}.yaml'.format(category))
        write_yaml_file(data[category], output_file_yaml)


if __name__ == "__main__":
    main()

import json
import os
from pprint import pprint

import requests
import yaml

# From https://stackoverflow.com/questions/25108581/python-yaml-dump-bad-indentation
class MyDumper(yaml.Dumper):

    def increase_indent(self, flow=False, indentless=False):
        return super(MyDumper, self).increase_indent(flow, False)

def remove_old_file(f):
    try:
        print 'removing old', f
        os.remove(f)
    except OSError:
        pass


def download_file(url, output_file):
    response = requests.get(url)
    with open(output_file, 'wb') as f:
        f.write(response.content)


def write_yaml_file(data, output_file):
    with open(output_file, "a") as f:
        yaml.dump(data, f, Dumper=MyDumper, default_flow_style=False)


def main():
    url = "http://slackmojis.com/emojis.json"
    output_file = 'emojis.json'
    output_file_yaml = 'new_slackmojis.yaml'

    #remove_old_file(output_file)
    #download_file(url, output_file)

    with open(output_file) as slackmoji_file:
        slackmojis = json.load(slackmoji_file)

    remove_old_file(output_file_yaml)

    data_header = {
        'title': 'slackmojis'
        }
    write_yaml_file(data_header, output_file_yaml)

    data = {
        'emojis': []
    }

    for slackmoji in slackmojis:
        slackmoji_data = {
            'name': str(slackmoji['name']),
            'src': str(slackmoji['image_url'])
        }
        data['emojis'].append(slackmoji_data)

    write_yaml_file(data, output_file_yaml)

if __name__ == "__main__":
    main()

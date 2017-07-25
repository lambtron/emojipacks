#!/usr/bin/env python
# encoding: utf-8
"""
Verify src files in YAML are images and not too big
"""
from __future__ import print_function, unicode_literals
from PIL import Image  # pip install pillow
import argparse
import glob
import os
import re
import sys
import yaml  # pip install pyyaml
import io

if sys.version_info >= (3, 0):
    from urllib.error import URLError
    from urllib.request import Request, urlopen
else:
    from urllib2 import URLError, Request, urlopen

DISALLOWED_CHARS_REGEX = re.compile('[^a-z0-9_-]')
HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/35.0.1916.153 Safari/537.36 SE 2.X MetaSr 1.0"
}


def load_yaml(filename):
    """
    Load YAML data from a file
    """
    with open(filename) as f:
        # yaml.BaseLoader leaves everything as a string,
        # so doesn't convert "no" to False
        data = yaml.load(f, Loader=yaml.BaseLoader)
    return data


def check_name(name):
    """Check emoji name is valid.
    Return error if invalid.
    Return None if valid."""
    # http://stackoverflow.com/a/92000/724176
    if DISALLOWED_CHARS_REGEX.search(name):
        # Name is invalid
        return ("Error: custom emoji names can only contain lower case "
                "letters, numbers, dashes and underscores: {}".format(name))
    else:
        # Name is valid
        return None


def name_from_path(path):
    """Given 'packs/frontend.yaml' return 'frontend'"""
    basename = os.path.basename(path)
    return os.path.splitext(basename)[0]


def create_dirs(dir):
    """Create directory and all intermediate-level directories"""
    if not os.path.isdir(dir):
        os.makedirs(dir)


def resize_image(im, yaml_filename, url):
    """Given:
        * an image,
        * a yaml_filename ('packs/packname.yaml')
        * and a URL ('https://example.com/emojiname.png')
        thumbnail it to no more than 128x128, preserving aspect ratio,
        and save to 'resized/packname/emojiname.png'
        """
    subdir = name_from_path(yaml_filename)
    subdir = os.path.join("resized", subdir)
    create_dirs(subdir)
    im.thumbnail((128, 128), Image.BICUBIC)
    outfile = os.path.basename(url)
    outfile = os.path.join(subdir, outfile)
    im.save(outfile)
    return outfile


def check_aliases(aliases, emoji_names, errors):
    for alias in aliases:
        error = check_name(alias)
        if error:
            errors.append(error)
        if alias in emoji_names:
            errors.append("Error: Alias {} is already defined elsewhere"
                    .format(alias))
        emoji_names.add(alias)


def check_yaml(yaml_filename, resize=False):
    """
    Given emojipack YAML filename, check each image in the src field
    is an image of the correct size
    """
    errors = []
    warnings = []
    resized = []

    out = "Checking {}".format(yaml_filename)
    sys.stdout.write(out)

    data = load_yaml(yaml_filename)

    urls_checked = dict()
    emoji_names = set()
    for emoji in data["emojis"]:

        error = check_name(emoji["name"])
        if error:
            errors.append(error)

        if emoji["name"] in emoji_names:
            errors.append("Error: Emoji named {} already defined elsewhere."
                    .format(emoji["name"]))
        emoji_names.add(emoji["name"])

        if "aliases" in emoji:
            check_aliases(emoji["aliases"], emoji_names, errors)

        url = emoji["src"]
        if url in urls_checked:
            warnings.append("Warning: {} should be an alias for {}.".format(
                emoji["name"], urls_checked[url]))
        else:
            urls_checked[url] = emoji["name"]

            sys.stdout.write('.')

            try:
                download = urlopen(Request(url=url, headers=HEADERS))
                body = download.read()
                download.close()

                # Square images work best. Image can't be larger than 128px in
                # width or height, and must be smaller than 64K in file size.
                if len(body) > 65536:
                    error = ("Error: must be smaller than 64K in file size: "
                             "{}").format(url)
                    errors.append(error)

                with io.BytesIO(body) as f:
                    # Is it an image?
                    im = Image.open(f)
                    if im.width > 128 or im.height > 128:
                        if resize:
                            outfile = resize_image(im, yaml_filename, url)
                            message = "Info: resized {} to {}".format(
                                url, outfile)
                            resized.append(message)

                        error = ("Error: image can't be larger than 128px "
                                 "in width or height: {} {}".format(
                                     im.size, url))
                        errors.append(error)

                    elif im.width != im.height:
                        warning = ("Warning: square images work best: "
                                   "{} {}".format(im.size, url))
                        warnings.append(warning)
            except URLError as e:
                error = "Error: cannot fetch image: {} ({})".format(url,
                                                                    e.reason)
                errors.append(error)
            except IOError as e:
                error = "Error: cannot open as image: {}: {}".format(url,
                                                                     e.strerror)
                errors.append(error)

    print()
    print()
    print("Found {} errors in {}".format(len(errors), yaml_filename))
    if len(errors):
        print("\n".join(errors))
    print()
    print("Fixed {} errors in {}".format(len(resized), yaml_filename))
    if len(resized):
        print("\n".join(resized))
        print("Please re-upload and update YAML")
    print()
    print("Found {} warnings in {}".format(len(warnings), yaml_filename))
    if len(warnings):
        print("\n".join(warnings))
    print()
    return errors, warnings


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Verify src files in YAML are images and not too big",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('inspec', nargs='?',
                        help="Input file spec")
    parser.add_argument('-r', '--resize',
                        action='store_true',
                        help="Whether to resize large files")
    args = parser.parse_args()

    if args.inspec:
        filenames = glob.glob(args.inspec)
        if not filenames:
            sys.exit("No input files found matching " + args.inspec)

    all_errors = []
    all_warnings = []
    for filename in filenames:
        errors, warnings = check_yaml(filename, args.resize)
        all_errors += errors
        all_warnings += warnings

    print("Found {} total errors and {} total warnings".format(
        len(all_errors), len(all_warnings)))

    sys.exit(len(all_errors))

# End of file

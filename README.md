# emojipacks

[![Build Status](https://travis-ci.org/lambtron/emojipacks.svg?branch=master)](https://travis-ci.org/lambtron/emojipacks)

> CLI to bulk upload emojis to your Slack!

## Install

*Note you must have `node` and `npm` installed. If you don't, go to [nodejs.org](https://www.nodejs.org) and follow the install instructions there.*

```bash
$ npm install -g emojipacks
```

or

```bash
$ git clone git@github.com:lambtron/emojipacks.git
$ cd emojipacks
$ make
```

## Usage

There is only one command:

```bash
$ emojipacks
```

It'll ask you a few questions:

```bash
Slack subdomain: 20percentclub
Email address login: andyjiang@gmail.com
Password: *********
Path or URL of Emoji yaml file: ./packs/futurama.yaml
```

Then, let it work its magic:

```bash
Starting import
Got tokens
Logged in
Upload crumb is s-1437797544-90b75206a7-☃
Getting emoji page
Uploading bender with http://i.imgur.com/7zYM751.png
Uploading amywong with http://i.imgur.com/DgKkcCi.png
 .
 .
 .
Uploading hypnotoad with http://i.imgur.com/o7tyjxN.gif
Uploaded emojis
```

Note that the emoji pack to upload can be a **path** to a yaml file on your machine or a **URL**, like [http://www.emojipacks.com/packs/food.yaml](http://www.emojipacks.com/packs/food.yaml).

## Optionally Pass Command Line Parameters

This will allow for easier batch uploading of multiple yaml files

```bash
$ emojipacks -s <subdomain> -e <email> -p <password> -y <yaml_file>
```

## Run Batch Upload script

A file named batchUploadExample.sh is provided for your reference. Edit this file change the subdomain, email, and password parameters to your own and save it as batchUpload.sh or something similar.

This script will aid in the process of batch uploading.

It optionally takes an argument for the directory path that contains your yaml files. If this is not provided './packs' will be used by default.

```bash
$ ./batchUpload.sh [path_to_yaml_files]
```

## Emoji Yaml File

Also note that the yaml file must be indented properly and formatted as such:

```yaml
title: food
emojis:
  - name: apple
    src: http://i.imgur.com/Rw0Vlda.png
  - name: applepie
    src: http://i.imgur.com/g4RU1fM.png
```

..with the `src` pointing to an image file. According to Slack:

- Square images work best
- Image can't be larger than 128px in width or height
- Image must be smaller than 64K in file size

### Emoji Aliases
It is possible to give multiple names to a single emoji using yaml such as:
```yaml
title: octicons
emojis:
  - name: pr
    aliases:
      - pullrequest
      - mergerequest
    src: https://i.imgur.com/rhwNxfc.png
```


## Emoji packs

- [animals](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/animals.yaml)
- [clippy](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/clippy.yaml)
- [fika](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/fika.yaml)
- [frontend](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/frontend.yaml)
- [harrypotter](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/harrypotterhouses.yaml)
- [mario](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/mario-8bit.yaml)
- [occupy](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/occupy.yaml)
- [officespace](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/officespace.yaml)
- [omnom](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/omnom.yaml)
- [scrabble](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/scrabble.yaml)
- [futurama](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/futurama.yaml)
- [food](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/food.yaml)
- [skype](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/skype.yaml)
- [starwars](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/starwars.yaml)
- [startups](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/startups.yaml)
- [businessfish](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/businessfish.yaml)
- [hipchat](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/hipchat.yaml)
- [twitch](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/twitch.yaml)
- [Slackmojis](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/slackmojis.yaml)
- [parrotparty](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/parrotparty.yaml) ([Parrot](http://cultofthepartyparrot.com/) [Paint](http://cultofthepartyparrot.com/paint/))
- [Finland](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/finland.yaml)
- [pokemongo: items](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/pokemongo.yaml)
- [Pokémon Go: Pokémon](https://raw.githubusercontent.com/Templarian/slack-emoji-pokemon/master/pokemon.yaml) ([Prefixed `pokemon-*`](https://raw.githubusercontent.com/Templarian/slack-emoji-pokemon/master/pokemon-prefix.yaml))
- [nekoatsume](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/nekoatsume.yaml)
- [octicons](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/octicons.yaml)
- [pokemon](https://raw.githubusercontent.com/jaylynch/pokemoji/master/pokemon-by-name.yaml)
- [devicon](https://raw.githubusercontent.com/izumin5210/emojipack-for-devicon/master/png/devicon.yaml) ([Devicon](http://devicon.fr/))
- [hamsterdance](https://raw.githubusercontent.com/snipe/hamsterdance-emojipack/master/hamsterdance.yaml) ([snipe/emojipacks](https://github.com/snipe/hamsterdance-emojipack))
- [avengers](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/avengers.yml)
- [Shiba Stickers](https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/shiba.yaml) (from Messenger)
- [gamedevmoji](https://raw.githubusercontent.com/niksudan/gamedevmoji/master/gamedevicons.yaml)

![](http://media1.giphy.com/media/68H7QjnqFOn2E/100.gif)

Want to contribute? [Suggest an emoji pack](https://20p.typeform.com/to/xOFDyq)!

## Troubleshooting

This script will essentially log into your Slack and then submit a `POST` request on the emoji upload form page. If you are seeing errors, make sure that:
- **you have Slack privileges to add custom emojis**: otherwise, the script won't be able to get to the emoji upload form
- **you disabled two-factor authentication**: again, having two-factor enabled will prevent the script from getting to the necessary emoji upload form
- **your credentials are correct**: if you have done all of the following correctly try running the command **emojipacks -d**

*Still having issues? Create an issue [here](https://github.com/lambtron/emojipacks/issues/new).*

*Enjoyed this project? Check out my [blog](http://blog.andyjiang.com) for more*.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

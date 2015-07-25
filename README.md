# emojipacks-cli

> CLI to bulk upload emojis to your Slack!

## Install

```bash
$ npm install -g emojipacks
```

or

```bash
$ git clone git@github.com:lambtron/emojipacks-cli.git
$ cd emojipacks-cli
$ make
```

## Usage

There is only one command:

```bash
$ emojipacks
```

..and it'll ask you a few questions:

```bash
Slack subdomain: 20percentclub
Email address login: andyjiang@gmail.com
Password: *********
Path or URL of Emoji yaml file: ./packs/futurama.yaml
```

..and let it work its magic:

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

Note that the emoji pack to upload can be a path to a yaml file on your machine or a URL like [http://www.emojipacks.com/packs/food.yaml](http://www.emojipacks.com/packs/food.yaml).

## Emoji Yaml File

Also note that the yaml file must be formatted as such:

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

## Emoji packs

- [futurama](http://www.emojipacks.com/packs/futurama.yaml)
- [food](http://www.emojipacks.com/packs/food.yaml)
- [skype](http://www.emojipacks.com/packs/skype.yaml)
- [starwars](http://www.emojipacks.com/packs/starwars.yaml)
- [startups](http://www.emojipacks.com/packs/startups.yaml)

![](http://media1.giphy.com/media/68H7QjnqFOn2E/100.gif)

Want to contribute? [Suggest an emoji pack](https://20p.typeform.com/to/xOFDyq)!

*Enjoyed this project? Check out my [blog](https://blog.andyjiang.com) for more*.

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


# hubot-s3-size

A Hubot script that calculates the S3 bucket size

## Installation

    $ npm install https://github.com/bouzuya/hubot-s3-size/archive/master.tar.gz

or

    $ npm install https://github.com/bouzuya/hubot-s3-size/archive/{VERSION}.tar.gz

## Example

    bouzuya> hubot s3 size blog.bouzuya.net
      hubot> blog.bouzuya.net has 1444 objects 10.87 MB

## Configuration

See [`src/scripts/s3-size.coffee`](src/scripts/s3-size.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-s3-size
[travis-badge]: https://travis-ci.org/bouzuya/hubot-s3-size.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-s3-size
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-s3-size.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-s3-size
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-s3-size.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net

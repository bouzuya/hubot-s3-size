# Description
#   A Hubot script that DESCRIPTION
#
# Configuration:
#   None
#
# Commands:
#   hubot XXX [<args>] - DESCRIPTION
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  AWS = require 'aws-sdk'
  pretty = require 'pretty-bytes'

  listObject = (bucket, callback) ->
    f = (result, params, callback) ->
      config =
        apiVersion: '2006-03-01'
        accessKeyId: process.env.HUBOT_S3_SIZE_ACCESS_KEY_ID
        secretAccessKey: process.env.HUBOT_S3_SIZE_SECRET_ACCESS_KEY
        region: process.env.HUBOT_S3_SIZE_REGION ? 'ap-northeast-1'
      s3 = new AWS.S3(config)
      s3.listObjects params, (err, data) ->
        return callback(err) if err?
        result = result.concat(data.Contents)
        if data.IsTruncated
          [..., last] = data.Contents
          params.Marker = data.NextMarker ? last.Key
          f(result, params, callback)
        else
          callback(null, result)

    params =
      Bucket: bucket
    f([], params, callback)


  robot.respond /s3[ -]size(?: (\S+))?$/i, (res) ->
    bucket = res.match[1] ? 'blog.bouzuya.net'
    listObject bucket, (err, data) ->
      return res.send(err) if err?
      sum = data.reduce (size, obj) ->
        size + obj.Size
      , 0
      res.send "#{bucket} has #{data.length} objects #{pretty(sum)}"

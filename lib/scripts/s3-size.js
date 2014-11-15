// Description
//   A Hubot script that DESCRIPTION
//
// Configuration:
//   None
//
// Commands:
//   hubot XXX [<args>] - DESCRIPTION
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var AWS, listObject, pretty;
  AWS = require('aws-sdk');
  pretty = require('pretty-bytes');
  listObject = function(bucket, callback) {
    var f, params;
    f = function(result, params, callback) {
      var config, s3, _ref;
      config = {
        apiVersion: '2006-03-01',
        accessKeyId: process.env.HUBOT_S3_SIZE_ACCESS_KEY_ID,
        secretAccessKey: process.env.HUBOT_S3_SIZE_SECRET_ACCESS_KEY,
        region: (_ref = process.env.HUBOT_S3_SIZE_REGION) != null ? _ref : 'ap-northeast-1'
      };
      s3 = new AWS.S3(config);
      return s3.listObjects(params, function(err, data) {
        var last, _ref1, _ref2;
        if (err != null) {
          return callback(err);
        }
        result = result.concat(data.Contents);
        if (data.IsTruncated) {
          _ref1 = data.Contents, last = _ref1[_ref1.length - 1];
          params.Marker = (_ref2 = data.NextMarker) != null ? _ref2 : last.Key;
          return f(result, params, callback);
        } else {
          return callback(null, result);
        }
      });
    };
    params = {
      Bucket: bucket
    };
    return f([], params, callback);
  };
  return robot.respond(/s3[ -]size(?: (\S+))?$/i, function(res) {
    var bucket, _ref;
    bucket = (_ref = res.match[1]) != null ? _ref : 'blog.bouzuya.net';
    return listObject(bucket, function(err, data) {
      var sum;
      if (err != null) {
        return res.send(err);
      }
      sum = data.reduce(function(size, obj) {
        return size + obj.Size;
      }, 0);
      return res.send("" + bucket + " has " + data.length + " objects " + (pretty(sum)));
    });
  });
};


/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var get = thunkify(require('request').get);
var resolve = require('path').resolve;
var exists = require('fs').existsSync;
var path = require('path').resolve;
var isUri = require('valid-url').isUri;
var yaml = require('js-yaml');
var fs = require('fs');

/**
 * Get pack.
 *
 * @param {string}
 *
 * @return {array}
 */

exports.get = function *(path) {
  var yml = yield getYaml(path);
  return yaml.safeLoad(yml);
};

/**
 * Get the yaml.
 *
 * @param {String} path
 *
 * @return {array}
 */

function *getYaml(path) {
  if (isUri(path)) {
    var res = yield get(path);
    return res[0].body;
  }
  if (exists(resolve(process.cwd(), path))) return fs.readFileSync(path, 'utf-8');
  return;
}

var isSubdomain = require('./valid').subdomain;
var isPassword = require('./valid').password;
var isEmail = require('./valid').email;
var isUri = require('valid-url').isUri;
var resolve = require('path').resolve;
var join = require('path').join;
var exists = require('fs').existsSync;
var chalk = require('chalk');
var get = require('thunkify-wrap')(require('request').get);
var yaml = require('js-yaml');
var fs = require('fs');

exports.get = function () {
  var creds = loadCredentials();
  if (creds) return {
    subdomain: validate(creds.subdomain, isSubdomain, 'Uh oh! The subdomain should be at least one letter!'),
    email: validate(creds.email, isEmail, `Are you sure that [${creds.email}] is an email address? :)`),
    password: validate(creds.password, isPassword, 'A password (as defined by this script) needs to have at least one character (not including you).')
  };
}

/**
 * Load credentials YAML
 *
 * @return {Object}
 */

function loadCredentials() {
  var creds = getYaml("~/.emojipacks.yaml");
  if (creds) return yaml.safeLoad(creds);
}

/**
 * Get the yaml.
 *
 * @param {String} path
 *
 * @return {array}
 */

function getYaml(path) {
  path = expandPath(path);
  if (exists(resolve(process.cwd(), path))) return fs.readFileSync(path, 'utf-8');
  return;
}

/**
 * Validates credentials
 *
 * @param {String} cred
 * @param {Function} validates
 * @param {String} error
 *
 * @return {String}
 */

function validate(cred, validates, error) {
  if (!validates(cred)) {
    err(chalk.red(error));
    throw new Error(error);
  }
  return cred;
}

/**
 * Expand ~ to home path
 *
 * @param {String} path
 *
 * @return {String}
 */

function expandPath(path) {
  if (path[0] === '~') {
    return join(process.env.HOME, path.slice(1));
  }
  return path;
}

/**
 * Show error message.
 */

function err(message) {
  console.log(chalk.red(message));
}
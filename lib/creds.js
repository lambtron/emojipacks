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

var userCredsFile = expandPath('~/.emojipacks.yaml');

/**
 * Check if there is a user credentials file
 *
 * @return {Boolean}
 */
exports.hasCredsFile = hasCredsFile;

/**
 * Load and get the credentials from the credentials user file
 *
 * @return {Object}
 */
exports.get = function() {
  var creds = loadCredentials();
  if (creds) return {
    url: validate(creds.subdomain, isSubdomain, 'Uh oh! The subdomain should be at least one letter!'),
    email: validate(creds.email, isEmail, `Are you sure that [${creds.email}] is an email address? :)`)
  };
}

/**
 * Check if there is a user credentials file
 *
 * @return {Boolean}
 */

function hasCredsFile() {
  return exists(userCredsFile);
}

/**
 * Load credentials YAML
 *
 * @return {Object}
 */

function loadCredentials() {
  var creds = getYaml();
  if (creds) return yaml.safeLoad(creds);
}

/**
 * Get the yaml.
 *
 * @return {array}
 */

function getYaml() {
  if (hasCredsFile) return fs.readFileSync(userCredsFile, 'utf-8');
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

/**
 * Module dependencies.
 */

var cheerio = require('cheerio');
var thunkify = require('thunkify-wrap');
var request = thunkify(require('request'));
var write = require('./debug').write;
var req = require('request');
var fs = require('fs');

/**
 * Expose `Slack`.
 */

module.exports = Slack;

/**
 * Static variables
 */

var emojiUploadFormPath = '/admin/emoji';
var emojiUploadImagePath = '/customize/emoji';

/**
 * Initialize a new `Slack`.
 */

function Slack(opts, debug) {
  if (!(this instanceof Slack)) return new Slack(opts);
  this.opts = opts;
  this.debug = debug;

  /**
   * Do everything.
   */

  this.import = function *() {
    try {
      console.log('Starting import');
      yield this.tokens();
      console.log('Got tokens');
      yield this.login();
      console.log('Logged in');
      yield this.emoji();
    } catch (e) {
      console.log('Uh oh! ' + e);
      throw e;
    }
    console.log('Getting emoji page');
    for (var i = 0; i < Object.keys(this.opts.emojis).length; i++) {
      var e = this.opts.emojis[i];
	  yield this.remove(e.name);
      var uploadRes = yield this.upload(e.name, e.src);
    }
    console.log('Uploaded emojis');
    return 'Success';
  };
  
  /**
   * Remove
   */
  this.remove = function *(name) {

    var opts = this.opts;
    var load = {
      url: opts.url + emojiUploadImagePath,
      jar: opts.jar,
      method: 'GET'
    };
	var currentCrumb;
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
	$('input[name="remove"]').each(function(i, elem) {
		if ($(this).attr('value') == name) {
			currentCrumb = $(this).prev().attr('value');
		}
	});
	
	if (currentCrumb == null) {
		return;
	}
	
    console.log('Removing %s with crumb %s', name, currentCrumb);
    return new Promise(function(resolve, reject, notify) {
      var opts = this.opts;
      var r = req({
        url: opts.url + emojiUploadImagePath,
        method: 'POST',
        jar: opts.jar,
        followAllRedirects: true
      }, function(err, res, body) {
        if (err || !body) return reject(err);
        resolve(body);
      });
      var form = r.form();
      form.append('crumb', currentCrumb);
      form.append('remove', name);
    }.bind(this));
  };

  /**
   * Get login page (aka credentials).
   */

  this.tokens = function *() {
    var opts = this.opts;
    opts.jar = opts.jar || { _jar: { store: { idx: {} } } };
    var load = {
      url: opts.url,
      jar: opts.jar,
      method: 'GET'
    };
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
    if (this.debug) write($('title').text(), $.html());
    opts.formData = {
      signin: $('#signin_form input[name="signin"]').attr('value'),
      redir: $('#signin_form input[name="redir"]').attr('value'),
      crumb: $('#signin_form input[name="crumb"]').attr('value'),
      remember: 'on',
      email: opts.email,
      password: opts.password
    };
    if (!opts.formData.signin && !opts.formData.redir && !opts.formData.crumb) throw new Error('Login error: could not get login form for ' + opts.url);
    return this.opts = opts;
  };

  /**
   * Log into Slack and populate cookies.
   */

  this.login = function *() {
    var opts = this.opts;
    var load = {
      url: opts.url,
      jar: opts.jar,
      method: 'POST',
      followAllRedirects: true,
      formData: opts.formData
    };
    var res = yield request(load);
    return this.opts = opts;
  };

  /**
   * Get the emoji upload page.
   */

  this.emoji = function *() {
    var opts = this.opts;
    var load = {
      url: opts.url + emojiUploadFormPath,
      jar: opts.jar,
      method: 'GET'
    };
    var res = yield request(load);
    var $ = cheerio.load(res[0].body);
    if (this.debug) write($('title').text(), $.html());
    opts.uploadCrumb = $('#addemoji > input[name="crumb"]').attr('value');
    console.log("Upload crumb is %s", opts.uploadCrumb);
    if (!opts.uploadCrumb) throw new Error('Login error: could not get emoji upload crumb for ' + opts.url);
    return this.opts = opts;
  };

  /**
   * Upload the emoji.
   */

  this.upload = function *(name, emoji) {
    console.log('Uploading %s with %s', name, emoji);
	
    return new Promise(function(resolve, reject, notify) {
      var opts = this.opts;
      var r = req({
        url: opts.url + emojiUploadImagePath,
        method: 'POST',
        jar: opts.jar,
        followAllRedirects: true
      }, function(err, res, body) {
        if (err || !body) return reject(err);
        resolve(body);
      });
      var form = r.form();
      form.append('add', '1');
      form.append('crumb', opts.uploadCrumb);
      form.append('name', name);
      form.append('mode', 'data');
      form.append('img', req(emoji));
    }.bind(this));
  };
}

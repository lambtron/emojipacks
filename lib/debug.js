
/**
 * Module dependencies.
 */

var resolve = require('path').resolve;
var fs = require('fs');

/**
 * Write file.
 */

exports.write = function(title, html) {
  var test = resolve(__dirname, '../test/' + title + '.html');
  fs.writeFileSync(test, html);
};

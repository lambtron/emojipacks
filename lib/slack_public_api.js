var thunkify = require('thunkify-wrap');
var request = thunkify(require('request'));

function SlackPublicAPI(token) {
  this.token = null

  this.setToken(token);
}

SlackPublicAPI.prototype.setToken = function(token) {
  this.token = token;
};

SlackPublicAPI.prototype.getUsers = function *() {
    var opts = this.opts;
    var load = {
      url: "https://slack.com/api/users.list?token=" + this.token + "&pretty=1",
      jar: { _jar: { store: { idx: {} } } },
      method: 'GET'
    };
    const members = JSON.parse((yield request(load))[0].body).members;

    return members;
};

SlackPublicAPI.prototype.getUsernamesWithAvatar = function*() {
  const members = yield this.getUsers();
  if (!members) { return; };
  var results = [];

  for (var i = 0; i < members.length; i++) {
    var result;
    const member = members[i];
    const image = yield this.extractImage(member);
    const username = this.extractUsername(member);

    if (username !== null && image !== null){
      result = {
        name: username,
        src: image
      };
    }
    results.push(result);
  }

  return results;
};

SlackPublicAPI.prototype.extractUsername = function(obj) {
  return obj.name.replace(/[^\w ]/, '');
}

SlackPublicAPI.prototype.extractImage = function*(obj) {
  const image_url = obj.profile.image_24
  const load = {
    method: 'GET',
    url: image_url
  }
  const res = yield request(load);
  if (res[0].headers.link === undefined) { return image_url };
  const indexLinkBegin = res[0].headers.link.indexOf('<');
  const indexLinkEnd = res[0].headers.link.indexOf('>');
  const imageLocation = res[0].headers.link.slice(indexLinkBegin + 1, indexLinkEnd);

  return imageLocation;  
}

module.exports = SlackPublicAPI;
var thunkify = require('thunkify-wrap');
var request = thunkify(require('request'));


function SlackPublicAPI(token) {
  this.token = null

  this.setToken(token);
  console.log("Hello SlackPublicAPI")
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
    var res = yield request(load);
    console.log("-->", JSON.parse(res[0].body).members[0].name)
    return res.members;
};

SlackPublicAPI.prototype.getUsernamesWithAvatar = function*() {
  const usersInfos = yield this.getUsers();
  if (!usersInfos) { return; };
  var results = [];
  console.log(typeof(userInfos))
  results = usersInfos.map(function(userInfos) {
    const username = userInfos.name;
    const image = userInfos.profile.image_24;
    var result;

    if (username !== null && image !== null){
      result = {username: username, image: image};
    }

    return result
  });
};

module.exports = SlackPublicAPI;
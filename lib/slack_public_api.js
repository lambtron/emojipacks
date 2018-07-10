const { WebClient } = require('@slack/client');

function SlackPublicAPI(token) {
  this.token = null
  this.web = null

  this.setToken(token);
  console.log("Hello SlackPublicAPI")
}

SlackPublicAPI.prototype.setToken = function(token) {
  this.token = token;
  this.web = new WebClient(this.token);
};

SlackPublicAPI.prototype.getUsers = function() {
  this.web.users.list({ limit: 0 })
  .then((res) => {
    console.log('Number of users: ', res.members.length);
    console.log('Users: ', res.members);
  })
  .catch(console.error("Couldn't connect to the API"));
};

SlackPublicAPI.prototype.getUsernamesWithAvatar = function() {
  const usersInfos = this.getUsers();
  if (!usersInfos) { return; };
  var results = [];

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
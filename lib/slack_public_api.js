const { WebClient } = require('@slack/client');

function slackPublicAPI(token) {
  this.setToken(token);
}

slackPublicAPI.prototype.setToken = function() {
  this.token = token;
  this.web = new WebClient(token);
};

slackPublicAPI.prototype.getUsers = function() {
  this.web.users.list({ limit: 0 })
  .then((res) => {
    console.log('Number of users: ', res.members.length);
    console.log('Users: ', res.members);
  })
  .catch(console.error);
};

slackPublicAPI.prototype.getUsernamesWithAvatar = function() {
  const usersInfos = this.getUsers();
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

module.exports = slackPublicAPI;
angular.module('GithubUsers').controller('usersCtrl',['Users',function(Users){
  Users.getAllUsers().then(function(users){
    console.log(users);
  })
}])

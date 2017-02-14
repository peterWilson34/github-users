angular.module('GithubUsers').directive('usersList',['Users',function(Users){
  return{
    templateUrl:'templates/usersListTpl.html'
  }
}])

angular.module('GithubUsers').controller('usersCtrl',['getAllUsers','$scope','$location',function(getAllUsers,$scope,$location){
  console.log(getAllUsers);
  $scope.users=getAllUsers;
  $location.url('users/'+getAllUsers[0].login)
}])

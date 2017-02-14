angular.module('GithubUsers').controller('usersCtrl',['getAllUsers','$scope',function(getAllUsers,$scope){
  console.log(getAllUsers);
  $scope.users=getAllUsers
}])

angular.module('GithubUsers').controller('singleUserCtrl',['$stateParams','Users','$scope',function($stateParams,Users,$scope){
  console.log($stateParams);
  Users.getUserById($stateParams.login).then(function(user){
    console.log(user);
    $scope.user=user;
  })
}])

angular.module('GithubUsers').controller('usersCtrl',['getAllUsers','$scope','$location','Users',function(getAllUsers,$scope,$location,Users){
  $scope.users=getAllUsers;
  $location.url('users/'+getAllUsers[0].login);
  $scope.loadMore=function(length){
    Users.getMoreUsers(length).then(function(users){
      for (var i = 0; i < users.length; i++) {
        $scope.users.push(users[i]);
      }


    })
  }
}])

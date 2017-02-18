angular.module('GithubUsers').factory('Users',['$http','$q',function($http,$q){
  return{
    getAllUsers:function(){
      var defered= $q.defer();
      $http({
        url:'https://api.github.com/users',
        method:'GET'
      }).then(function(users){
        defered.resolve(users.data);
      },function(err){
        defered.reject(err);
      })
      return defered.promise;
    },
    getUserById:function(id){
      var defered= $q.defer();
      $http({
        url:'https://api.github.com/users/'+id,
        method:'GET'
      }).then(function(users){
        defered.resolve(users.data);
      },function(err){
        defered.reject(err);
      })
      return defered.promise;
    },
    getMoreUsers:function(id){
      var defered= $q.defer();
      $http({
        url:'https://api.github.com/users?since='+id,
        method:'GET'
      }).then(function(users){
        console.log(users);
        defered.resolve(users.data);
      },function(err){
        defered.reject(err);
      })
      return defered.promise;
    },
    test:function(id){
      var defered= $q.defer();

        defered.resolve('test');

      return defered.promise;
    }
  }
}])

angular.module('GithubUsers',['ui.router']);

angular.module('GithubUsers').run(['$rootScope','$state',function($rootScope,$state){
  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
}])

angular.module('GithubUsers').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state({
    name:'home',
    url:'/',
    templateUrl:'templates/homeTpl.html'
  })
  .state({
    name:'/home',
    url:'/home',
    redirectTo:'home'
  })

  .state({
    name:'about',
    url:'/about',
    templateUrl:'templates/aboutTpl.html'
  })
  .state({
      name:'about/',
      url:'/about/',
      redirectTo:'about'
    })

  .state({
    name:'users',
    url:'/users',
    controller:'usersCtrl',
    templateUrl:'templates/usersTpl.html',
    resolve:{
      getAllUsers:['Users','$q',function(Users,$q){
        var defered=$q.defer();
        Users.getAllUsers().then(function(users){
          defered.resolve(users);
        })
        return defered.promise;
      }]
    }

  })
  .state({
    name:'users.details',
    url:'/{login}',
    controller:'singleUserCtrl',
    templateUrl:'templates/singleUserTpl.html'
  })


  $urlRouterProvider.otherwise('/');
}])

angular.module('GithubUsers').directive('usersList',['Users',function(Users){
  return{
    templateUrl:'templates/usersListTpl.html'
  }
}])

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
    }
  }
}])

angular.module('GithubUsers').controller('singleUserCtrl',[function(){
}])

angular.module('GithubUsers').controller('usersCtrl',['getAllUsers','$scope',function(getAllUsers,$scope){
  console.log(getAllUsers);
  $scope.users=getAllUsers
}])

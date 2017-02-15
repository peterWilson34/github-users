angular.module('GithubUsers',['ui.router','angular-loading-bar']);

angular.module('GithubUsers').run(['$rootScope','$state','$timeout','$anchorScroll',function($rootScope,$state,$timeout,$anchorScroll){
  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    $rootScope.activePage=to.name;
    $rootScope.activeTitle=to.title;
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
  $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
    $anchorScroll()
    $timeout(function () {
      $(document).foundation();

    },100);

    });

}])

angular.module('GithubUsers').config(['$stateProvider','$urlRouterProvider','$locationProvider','cfpLoadingBarProvider',function($stateProvider,$urlRouterProvider,$locationProvider,cfpLoadingBarProvider){
  $stateProvider
  .state({
    name:'home',
    url:'/',
    templateUrl:'templates/homeTpl.html',
    title:'Github Users'
  })
  .state({
    name:'/home',
    url:'/home',
    redirectTo:'home',
    title:'Github Users'
  })

  .state({
    name:'about',
    url:'/about',
    templateUrl:'templates/aboutTpl.html',
    title:'About Github Users'
  })
  .state({
      name:'about/',
      url:'/about/',
      redirectTo:'about',
      title:'About Github Users'
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
    },
    title:'Github Users'

  })
  .state({
    name:'users.details',
    url:'/{login}',
    controller:'singleUserCtrl',
    templateUrl:'templates/singleUserTpl.html',
    title:'Github User Details'
  })
  cfpLoadingBarProvider.includeSpinner = false;

  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode(true)
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
        defered.resolve(users.data);
      },function(err){
        defered.reject(err);
      })
      return defered.promise;
    }
  }
}])

angular.module('GithubUsers').controller('singleUserCtrl',['$stateParams','Users','$scope',function($stateParams,Users,$scope){
  console.log($stateParams);
  Users.getUserById($stateParams.login).then(function(user){
    console.log(user);
    $scope.user=user;
  })
}])

angular.module('GithubUsers').controller('usersCtrl',['getAllUsers','$scope','$location','Users',function(getAllUsers,$scope,$location,Users){
  $scope.users=getAllUsers;
  $location.url('users/'+getAllUsers[0].login);
  $scope.loadMore=function(){
    Users.getMoreUsers($scope.users[$scope.users.length-1].id).then(function(users){
      for (var i = 0; i < users.length; i++) {
        $scope.users.push(users[i]);
      }


    })
  }
}])

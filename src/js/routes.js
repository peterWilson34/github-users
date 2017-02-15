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

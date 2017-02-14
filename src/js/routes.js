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
    templateUrl:'templates/usersTpl.html'
  })
  .state({
    name:'user-details',
    url:'/users/{login}',
    controller:'singleUserCtrl',
    templateUrl:'templates/singleUserTpl.html'
  })


  $urlRouterProvider.otherwise('/');
}])

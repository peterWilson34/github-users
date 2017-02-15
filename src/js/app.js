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

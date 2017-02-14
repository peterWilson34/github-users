angular.module('GithubUsers',['ui.router']);

angular.module('GithubUsers').run(['$rootScope','$state',function($rootScope,$state){
  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
    $(document).foundation();
    
}])

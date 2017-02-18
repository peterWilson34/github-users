describe('Users Factory',function(){
  var $controller,
  Users,
  $rootScope,
  $httpBackend,
  $q;
  beforeEach(module('GithubUsers'));
  beforeEach(angular.mock.inject(function(_$controller_,_Users_,_$rootScope_,_$httpBackend_,_$q_){
    $controller = _$controller_;
    Users = _Users_;
    $rootScope= _$rootScope_;
    $httpBackend=_$httpBackend_;


  }))

  it('get All users',function(){
    var result;
    $httpBackend.whenGET('https://api.github.com/users').respond(function(){
      return [200, JSON.stringify([{id:2},{id:3}]), {}];
    })
    Users.getAllUsers().then(function(res){
      result = res;

    });

    $httpBackend.flush();

    expect(result.length).toEqual(2);
  });
  it('get more users',function(){
    var result;
    $httpBackend.whenGET('https://api.github.com/users?since=1').respond(function(){
      return [200, JSON.stringify([{id:2},{id:3}]), {}];
    })
    Users.getMoreUsers(1).then(function(res){
      result = res;

    });

    $httpBackend.flush();
    expect(result.length).toEqual(2);
  })
})


describe('Users Controllers',function(){
  var $controller,
  Users,
  $rootScope,
  $httpBackend,
  $q;
  beforeEach(module('GithubUsers'));
  beforeEach(angular.mock.inject(function(_$controller_,_Users_,_$rootScope_,_$httpBackend_,_$q_){
    $controller = _$controller_;
    Users = _Users_;
    $rootScope= _$rootScope_;
    $httpBackend=_$httpBackend_;

    $httpBackend.whenGET('https://api.github.com/users').respond(function(){
      return [200, JSON.stringify([{id:2},{id:3}]), {}];
    })
  }))

  it('users should be defined and has at least one user',function(){
    var $scope={};
    var getAllUsers=[{id:1,login:1}]
    $controller('usersCtrl',{$scope:$scope,getAllUsers:getAllUsers})
    expect($scope.users).toBeTruthy();
    expect($scope.users.length).toBeTruthy();
  })
  it('get more users',function(){
    var $scope={};
    var getAllUsers=[{id:1,login:1}];
    $httpBackend.whenGET('https://api.github.com/users?since=1').respond(function(){
      return [200, JSON.stringify([{id:2},{id:3}]), {}];
    });

    $controller('usersCtrl',{$scope:$scope,getAllUsers:getAllUsers,Users:Users});
    expect($scope.users.length).toEqual(1);



    $scope.loadMore(1);
    $httpBackend.flush();
    expect($scope.users.length).toEqual(3);

  });
  it('user shouldn\'t be undefined',function(){
    var $scope={};
    $httpBackend.whenGET('https://api.github.com/users/1').respond(function(){
      return [200, JSON.stringify({id:2}), {}];
    })
    $controller('GithubUsers',{$scope:$scope,Users:Users});
  })

});

angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: 'app/links/links.html',
    //   controller: 'LinksController',
    //   authenticate: true
    // })
    // we added an 'authenticate' property to each route URL below. It's used in line 70 below to see if a route is supposed to be gated or not
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      authenticate: false
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      authenticate: false
    })
    // we added /links and /shorten below, following the exact pattern as above and using the spec file as reference
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    })
    // we added the below so that if you don't specify, it will send you to links (which will send you to signin if you're not authenticated)
    .otherwise({
      redirectTo: "/links"
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {

    // when all three of these conditions are TRUE, the if statement runs and the user is redirected:
    // 1. next.$$route = Does the route you're trying to go to next exist?
    // 2. next.$$route.authenticate = Is the route you're trying to go to next gated?
    // 3. !Auth.isAuth() = are you NOT authorized currently (are you NOT logged in?)
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {

      // Redirects any failed authentication to /signin
      $location.path('/signin');
    }
  });
});

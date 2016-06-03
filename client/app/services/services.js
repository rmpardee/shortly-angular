angular.module('shortly.services', [])

.factory('Links', function ($http) {
  // Your code here

  // Creates a function that makes a GET request to /api/links
  var httpGetLinks = function(){
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    // Once the request is done, we return the response data which is a collection of links
    .then(function(resp) {
      return resp.data;
    });
  };

  // Creates a function that makes a POST request to /api/links
  var httpPostLinks = function(link){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })
    // Once the request is done, we return the response data which is the link we were posting
    .then(function(resp) {
      return resp.data;
    });
  };

  // Return the functions in this factory as an object
  return {
    httpGetLinks: httpGetLinks,
    httpPostLinks: httpPostLinks
  }; 
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

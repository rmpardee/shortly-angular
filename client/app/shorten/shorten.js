angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {
    url: ''
    // shortened: '',
    // name: null,
    // counter: 0
  };

  // addLink invokes httpPostLinks in services.js with our entire $scope.link
  // object
  $scope.addLink = function( url ) {
    console.log("1) addLink Ran");

    // Uses the httpPostLinks fn from Links on the services page. Passing in $scope.link obj
    Links.httpPostLinks( url )
      // Once the above function is finished, we pass its return through an anon function
      .then(function(response){
        // Returns a response, not sure if neccessary
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

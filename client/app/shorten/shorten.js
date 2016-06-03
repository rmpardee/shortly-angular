angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};

  $scope.addLink = function() {
    Links.httpPostLinks()
      // Once the above function is finished, we pass its return through an anon function
      .then(function(response){
        // TO CHANGE: we don't know what we want to do with the response (and we're also not using the $location anywhere). This below is a guess but VERY LIKELY not correct
        $scope.link[response] = response;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

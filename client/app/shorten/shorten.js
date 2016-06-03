angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {
    url: '',
    shortened: '',
    name: null,
    counter: 0
  };

  // functions will go here to flesh out link obj

  $scope.addLink = function() {
    console.log("button works: ");
    
    // Assuming we're posting the fleshed out link object

    // Uses the httpPostLinks fn from Links on the services page. Passing in $scope.link obj
    Links.httpPostLinks( $scope.link )
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

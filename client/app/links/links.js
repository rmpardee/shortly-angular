angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {
    links: [ ]
  };

  $scope.getLinks = function () {
    // Need to use promise, the below won't work because of asyncronosity
    // $scope.data.link = Links.httpGetLinks();

    // Uses the httpGetLinks function from services.js 'Links' factory
    // This function returns 'resp.data' which is a collection of links stored in an array
    Links.httpGetLinks()
      // Once the above function is finished, we pass its return through an anon function
      .then(function(linkCollection){
        // Sets our data object's link property equal to our link collection
        $scope.data.links = linkCollection;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Invokes getLinks when LinksController loads
  $scope.getLinks();

});

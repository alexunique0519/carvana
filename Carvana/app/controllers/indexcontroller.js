'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', 'localStorageService', '$window',  '$modal', 'tripSearchService', function ($scope, $location, authService, localStorageService, $window, $modal, tripSearchService) {
    $scope.logOut = function () {

        var isLogOut = $window.confirm('Do you want to leave?');

        if (isLogOut) {

            authService.logOut();
            $location.path('/home');
            return false;
        }

    }

    $scope.authentication = authService.authentication;

   
    
    $scope.loadData = function(){
         var userData = localStorageService.get('currentUserData');
        if (userData) {

            $scope.img_url = userData.imageUrl;
            $scope.username = userData.username;

            $scope.authentication.isAuth = userData.isAuth;
        }
    }
    
    
    $scope.open = function (size) {
        
         var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'tripSearchPage',
                backdrop: true,
                windowClass: 'modal',
                controller: 'tripSearchModalController'
           
        });
            
       modalInstance.result.then(function (tripData) {
           //alert("click submit");
           
          tripSearchService.searchTrip(tripData).then(function(){
               $location.path('/tripResult');
          })   
          .error(function(){
              
          })       
             
        },
       function () {
           /*dismiss*/
           //alert("click cancel");

           $scope.Title = "test";
       });
    }

    $scope.OnReturn = function()
    {

    }
    
    
    
    
    

}]);



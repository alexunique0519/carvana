'use strict';
app.controller('tripResultController', ['$scope', 'ModelShareService', 'localStorageService', 'authService', '$location', function ($scope, ModelShareService, localStorageService, authService, $location) {

    
  $scope.RideShareResults = [];
    
  var rideShare = function (data) {
            this.DepartureTime = data.departureTime;
            this.FromProvince = data.fromProvince;
            this.FromCity = data.fromCity;
            this.FromLocation = data.fromLocation;
            this.ToProvince = data.toProvince;
            this.ToCity = data.toCity;
            this.ToLocation = data.toLocation; 
            this.Driver = data.driver;
            this.Id = data.id;
      };
    
  $scope.loadData = function(){
    
      var results = localStorageService.get('searchedRideShare').response;
      
     
      
      var length = results.length;
      
      
      
      
      for(var i=0; i<length; i++)
      {      
          
              var result  = results[i];
              var driverName = "";
         
              var ride =  new rideShare(result);
              
                    
              $scope.RideShareResults.push(ride);
            
              /* authService.getUserName(result.userId).then(function(username){
                $scope.RideShareResults[i].Driver = username;                          
              });*/
          
        };
          
      }
    
      $scope.ViewDetail = function(id){
          ModelShareService.setRideShareId(id);
        
          $location.path('/tripShareView');
      }
    
  
    
}]);
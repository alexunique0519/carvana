'use strict';
app.controller('tripShareViewController', ['$scope', 'ModelShareService', 'localStorageService', 'authService', '$location', function ($scope, ModelShareService, localStorageService, authService, $location) {
    
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
      var rideShareId = ModelShareService.getRideShareId();    
      
      for(var i=0; i<length; i++)
      {      
         var result  = results[i];
         if(rideShareId == result.id)
         {
             $scope.rideShare = result;
            
             authService.getDriverInfo(result.userId).then(function(data){
                $scope.driverInfo = data;                          
              });
            
             return;
         }
          
          
        };
          
      }

    
  
    
}]);
'use strict';
app.factory('RideShareService', ['$http', 'ModelShareService', '$location', '$q', 'localStorageService', function ($http, ModelShareService, $location, $q, localStorageService) {
    
     var deferred = $q.defer();
    
    var _addRideShare = function (data) {

        $http.post(serviceBase + 'api/rideShare/create', data).success(function (response) {
            
            //ModelShareService.setTripList(response);
           
           deferred.resolve(response);

            
        }).error(function (err, status) {
            
            console.log(err);
            
            deferred.reject(err);
            
            
        });
        
        return deferred.promise;
    };

        var RideShareServiceFactory = {};

        RideShareServiceFactory.addRideShare = _addRideShare;
      
        return RideShareServiceFactory;
}]);

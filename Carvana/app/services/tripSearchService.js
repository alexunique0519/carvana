'use strict';
app.factory('tripSearchService', ['$http', 'ModelShareService', '$location', '$q', 'localStorageService', function ($http, ModelShareService, $location, $q, localStorageService) {
    
     var deferred = $q.defer();
    
    var _searchTrip = function (tripData) {

        $http.post(serviceBase + 'api/rideShare/search', tripData).success(function (response) {
            
            //ModelShareService.setTripList(response);
            
            localStorageService.remove('searchedRideShare');
            localStorageService.set('searchedRideShare', { response });
            
           deferred.resolve(response);

            
        }).error(function (err, status) {
            
            console.log(err);
            
            deferred.reject(err);
            
            
        });
        
        return deferred.promise;
    };

        var tripSearchServiceFactory = {};

        tripSearchServiceFactory.searchTrip = _searchTrip;
      
        return tripSearchServiceFactory;
}]);

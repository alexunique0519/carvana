'use strict';
app.factory('ModelShareService', function () {

        
        var rideShareId = {}
        
        function _setRideShareId(id){
            rideShareId = id;
        } 
        function _getRideShareId(){
            return rideShareId;
        }
    
    
        var userName;

        var _user;

        var _foundTripList = [];
    
        var _getUserName = function () {
            return userName;
        }

        var _setUserName = function (value) {
            userName = value;
        }


        var _setUser = function(user){
            _user = user;
        }

        var _getUser = function(){
            return _user;
        }
        
        var _setTripList = function(tripList){
            _foundTripList = tripList;
        }
        
        var _getTripList = function(){
            return _foundTripList;
        }
        
        var ModelShareServiceFactory = {};

        ModelShareServiceFactory.setUserName = _setUserName;
        ModelShareServiceFactory.getUserName = _getUserName;
        ModelShareServiceFactory.setUser = _setUser;
        ModelShareServiceFactory.getUser = _getUser;
        ModelShareServiceFactory.setTripList = _setTripList;
        ModelShareServiceFactory.getTripList = _getTripList;
        ModelShareServiceFactory.setRideShareId = _setRideShareId;    
        ModelShareServiceFactory.getRideShareId = _getRideShareId;
    
        return ModelShareServiceFactory;
});

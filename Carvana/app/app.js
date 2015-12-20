'use strict';

var app = angular.module('carpoolApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'angularSpinner']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/profile", {
        controller: "userProfileController",
        templateUrl: "/app/views/profile.html"

    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.when("/activate", {
        controller: "activateController",
        templateUrl: "/app/views/activate.html",
        resolve: {
            // I will cause a 1 second delay
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
            }
        }
    });

    $routeProvider.when("/begin_password_reset", {
        controller: "resetPasswordController",
        templateUrl: "/app/views/begin_password_reset.html"
    });

    $routeProvider.when("/setNewPassword", {
        controller: "setNewPasswordController",
        templateUrl: "/app/views/setNewPassword.html"
    });

     $routeProvider.when("/tripSearch", {
        controller: "tripSearchModalContrller"
    });
    
    $routeProvider.when("/tripResult", {
       controller: "tripResultController",
       templateUrl: "/app/views/tripSearchResult.html"
    });
    
    $routeProvider.when("/tripShareView", {
        controller: "tripShareViewController",
        templateUrl: "/app/views/tripShareView.html"
    });
    
    $routeProvider.when("/shareRide", {
        controller: "shareRideController",
        templateUrl: "/app/views/shareRideView.html"
    });
    
   $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://carvana.azurewebsites.net/';
    //'http://localhost:58077/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'carpoolApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
   
});



app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);



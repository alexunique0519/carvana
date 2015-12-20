'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', 'ModelShareService', 'localStorageService', function ($scope, $location, authService, ngAuthSettings, ModelShareService, localStorageService) {

    $scope.login_data = {
        username: "",
        password: ""
    }

    $scope.message = "";

    $scope.setUserName = function () {

        ModelShareService.setUserName($scope.login_data.userName);
    }

    $scope.login = function () {


        if ($scope.login_data.username == '' || $scope.login_data.password == '')
        {
            return false;
        }

        //authService.login($scope.loginData).then(function (response) {
        authService.userLogin($scope.login_data).then(function (response) {

            ModelShareService.setUser(response.user);
            
            $location.path('/home');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };


}]);

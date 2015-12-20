'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', 'ModelShareService', '$http', function ($scope, $location, $timeout, authService, ModelShareService, $http) {

    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.erroMessage = "";
    $scope.passwordNotMatch = false;

    $scope.IsNextDisabled = true;


    $scope.registration = {
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        Email: "",
        ConfirmEmail:"",
        UserType: "",
        FirstName:"",
        LastName:""
    };

    var checkInputValidity = function () {

        if($scope.registration.password != $scope.registration.confirmPassword)
        {
            $scope.passwordNotMatch = true;

            return false;
        }
        else
        {
            $scope.passwordNotMatch = false;
        }

        if ($scope.registration.Email != $scope.registration.confirmEmail)
        {
            $scope.emailNotMatch = true;

            return false;
        }
        else
        {
            $scope.emailNotMatch = false;
        }

        return true;
    };

    $scope.CheckPasswordMatch = function () {

        if ($scope.registration.password != $scope.registration.confirmPassword) {

            $scope.passwordNotMatch = true;

            return false;
        }
        else
        {
            $scope.passwordNotMatch = false;
        }
    };

    $scope.CheckEmail = function () {
        if ($scope.registration.Email == '' || $scope.registration.Email == undefined)
        {
            $scope.blankEmail = true;
        }
        else
        {
            $scope.blankEmail = false;
        }
    };

    $scope.CheckConfirmEmail = function () {
        if($scope.registration.ConfirmEmail == '' || $scope.registration.ConfirmEmail == undefined)
        {
            $scope.blankConfirmEmail = true;
            return false;
        }
        else if( $scope.registration.ConfirmEmail == $scope.registration.Email)
        {
            $scope.blankConfirmEmail = false;
            $scope.emailNotMatch = false;
        }
        else
        {
            $scope.emailNotMatch = true;
        }
    };


     $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = response.data;

            //if signup succeeds, then login directly.
            if (response.status == 200) {
                var _loginData = {
                    userName: $scope.registration.userName,
                    password: $scope.registration.password
                };

                //if signup succeeds, then login directly.
                if (response.status == 200) {

                    var _loginData = {
                        userName: $scope.registration.userName,
                        password: $scope.registration.password,
                    };
                    
                    $scope.description = "The user has been created, will go to login page in 3 seconds";

                    $timeout(function () {
                        $location.path('/login');
                    }, 3000);

                    /*authService.userLogin(_loginData).then(function (response) {

                        ModelShareService.setUser(response.user);

                        $location.path('/home');
                    });*/

                }
            }
            else
            {
                $scope.ErrorMessage = response.statusText;
                $scope.description = response.data.message;
            }

        });
    };


    var registerUser = function () {


       authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = response.data;

            //if signup succeeds, then login directly.
            if (response.status == 200)
            {
               var _loginData = {
                   userName: $scope.registration.userName,
                   password: $scope.registration.password,
               };

               authService.userLogin(_loginData);
            }

            $location.path('/home');

        },
         function (response) {

             $scope.ErrorMessage = response.statusText;
        });

    };
}]);



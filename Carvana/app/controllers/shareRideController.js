'use strict';
app.controller('shareRideController', ['$scope', 'ModelShareService', 'localStorageService', 'authService', '$location', 'RideShareService', '$timeout', function ($scope, ModelShareService, localStorageService, authService, $location, RideShareService, $timeout) {
    
    
  $scope.dateTimeNow = function() {
        $scope.DepartureDate = new Date();
        
      };
    
  $scope.dateTimeNow();    
  $scope.DepartureTimeMessage = "";
  $scope.FromProvinceError = "";
  $scope.FromCityError = "";
  $scope.FromLocationError = "";
  $scope.ToProvinceError = "";
  $scope.ToCityError = "";
  $scope.ToLocationError = "";    
  $scope.SeatsAvailableError = "";
    
  var UserId = "";
  $scope.result = "";
    
  var ontarioCitys = ["Barrie","Belleville", "Brampton", "Brant", "Brantford", "Brockville", "Burlington",
                     "Cambridge", "Cornwall", "Dryden", "Elliot Lake", "Greater Sudbury", "Hamilton",
                     "Kenora", "Kingston", "Kitchener", "London", "Markham", "Mississauga", "Niagara Falls",
                     "Norfolk County", "North Bay", "Orilla", "Oshawa", "Ottawa", "Owen Sound", "Pembroke",
                     "Peterborough", "Pickering", "Port Colborne", "Quinte West", "Sarnia", "Sault Ste. Marie", 
                     "St. Catharines", "St. Thomas", "Stratford", "Temiskaming Shores", "Thorold", "Thunder bay",
                     "Timmins", "Toronto", "Vaughan", "Waterloo", "Welland", "Windsor", "Woodstock"];
  
  var BCCitys = ["Abbotsford", "Armstrong", "Burnaby", "Campbell River", "Castlegar", "Chilliwack", "Colwood", 
                 "Coquitlam", "Courtenay", "Cranbrook", "Dawson Creek", "Duncan", "Enderby", "Fernie", "Fort St. John", "Grand Forks",
                 "Greenwood", "Kamloops", "Kelowna", "Kimberley", "Langford", "Langley", "Maple Ridge", "Merritt", "Nanaimo", "Nelson", "New Westminster", "North Vancouver", "Parksville", "Penticton", "Pitt Meadows", "Port Alberni", "Port Coquitlam", "Port Moody", "Powell River", 
                 "Prince George", "Prince Rupert", "Quesnel", "Revelstoke", "Richmond", "Rossland", "Salmon Arm", "Surrey", "Terrace", "Trail", "Vancouver", "Vernon", "Victoria", "West Kelowna", "White Rock", "Williams Lake"];
  
    var ManitobaCitys = ["Brandon", "Dauphin", "Flin Flon", "Morden", "Portaga La Prairie", "Selkirk", "Steinbach", "Thompson", "Winkler",
                        "Winnipeg"];
    
    var SaskatchewanCitys = ["Estevan", "Flin Flon", "Humboldt", "Lloydminster", "Martensville", "Meadow Lake", "Melfort", "Melville",
                            "Moose Jaw", "North Battleford", "Prince Albert", "Regina", "Saskatoon", "Swift Current", "Warman", "Weyburn",
                            "Yorkton"];
      
    
    
  $scope.Init = function(){
      
      authService.getUserId(authService.authentication.userName).then(function(data){
            UserId = data;                       
      });
  }
   
   $scope.fromProvinceChange = function(){
      if($scope.from_province == "Ontario")
      {
          $scope.fromCityOptions = ontarioCitys;
      }
      else if ($scope.from_province == "British Columbia")
      {
          $scope.fromCityOptions = BCCitys;  
      }
      else if ($scope.from_province == "Manitoba")
      {
          $scope.fromCityOptions = ManitobaCitys;
      }
      else if ($scope.from_province == "Saskatchewan")
      {
          $scope.fromCityOptions = SaskatchewanCitys;
      }
  };
    
  $scope.toProvinceChange = function(){
       if($scope.to_province == "Ontario")
      {
          $scope.toCityOptions = ontarioCitys;
      }
      else if ($scope.to_province == "British Columbia")
      {
          $scope.toCityOptions = BCCitys;  
      }
      else if ($scope.to_province == "Manitoba")
      {
          $scope.toCityOptions = ManitobaCitys;
      }
      else if ($scope.to_province == "Saskatchewan")
      {
          $scope.toCityOptions = SaskatchewanCitys;
      }
  };
  
  
  $scope.onSubmit = function(){
    
      var nowDate = new Date(); 
      if($scope.DepartureDate <= nowDate)
       {
            $scope.DepartureTimeMessage = "The departure time should be in future";
            return;
       }
       else
       {
           $scope.DepartureTimeMessage = "";
           
       }
       if($scope.from_province == "" || $scope.from_province == undefined)
      {
          $scope.FromProvinceError = "The province could not be empty"
          return false;
      }
      else{
          $scope.FromProvinceError = "";
      }
      
      if($scope.from_city == "" || $scope.from_city == undefined)
      {
          $scope.FromCityError = "The city could not be empty"
          return false;
      }
      else
      {
          $scope.FromCityError = "";
      }
      if($scope.from_location == "" || $scope.from_location == undefined)
      {
          $scope.FromLocationError = "The location could not be empty"
          return false;
      }
      else
      {
          $scope.FromLocationError ="";
      }
      if($scope.to_province == "" || $scope.to_province == undefined)
      {
          $scope.ToProvinceError = "The province could not be empty"
          return false;
      }
      else
      {
          $scope.ToProvinceError = "";
      }
      if($scope.to_city == "" || $scope.to_city == undefined)
      {
          $scope.ToCityError = "The city could not be empty"
          return false;
      }
      else
      {
          $scope.ToCityError = "";
      }
      if($scope.to_location == "" || $scope.to_location == undefined)
      {
          $scope.ToLocationError = "The location could not be empty"
          return false;
      }
      else
      {
          $scope.ToLocationError = "";
      }
      if($scope.seatsAvailable == "" || $scope.seatsAvailable == undefined)
      {
          $scope.SeatsAvailableError = "The seat available value could not be empty"
          return false;
      }
      else
      {
          $scope.SeatsAvailableError = "";
      }
      var RideShareInfo = {
      DepartureTime : $scope.DepartureDate,
     
      FromProvince : $scope.from_province,
      FromCity : $scope.from_city,
      FromLocation : $scope.from_location,
      ToProvince : $scope.to_province,
      ToCity : $scope.to_city,
      ToLocation : $scope.to_location,
      SeatsAvailable: $scope.seatsAvailable, 
      UserId : UserId}
      
  
      RideShareService.addRideShare(RideShareInfo).then(function(data){
          
          $scope.result = "The ride share info has been created, will go to home page in 3 seconds";
          
          $timeout(function(){
               $location.path('/home');
          }, 3000);
          
      });
      
  }
    
    
    
    
 
 

    
  
    
}]);
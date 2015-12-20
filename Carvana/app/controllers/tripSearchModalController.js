app.controller('tripSearchModalController', ['$scope', '$timeout', '$modalInstance', function ($scope, $timeout, $modalInstance) {
  
  $scope.dateTimeNow = function() {
        $scope.StartDate = new Date();
        $scope.EndDate = new Date();
      };
    
  $scope.dateTimeNow();
  
  $scope.toggleMinDate = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
   
  $scope.maxDate = new Date('2014-06-22');
  $scope.toggleMinDate();

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };
  
  $scope.$watch('date', function () {
     //alert('changed');
  });
  
  // Disable weekend selection
  $scope.disabled = function(calendarDate, mode) {
    //return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
  };
  
  $scope.hourStep = 1;
  $scope.minuteStep = 15;

  $scope.timeOptions = {
    hourStep: [1, 2, 3],
    minuteStep: [1, 5, 10, 15, 25, 30]
  };

  $scope.showMeridian = true;
  $scope.timeToggleMode = function() {
    $scope.showMeridian = !$scope.showMeridian;
  };
 
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
    
  //
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
    
    
  $scope.StartDateTimeMessage = "";
  $scope.EndDateTimeMessage = "";
  $scope.FromProvinceError = "";
  $scope.FromCityError = "";
  $scope.FromLocationError = "";
  $scope.ToProvinceError = "";
  $scope.ToCityError = "";
  $scope.ToLocationError = "";    
    
  $scope.ok = function () {
      
      var currentdate = new Date(); 
      if($scope.EndDate <= currentdate){
          $scope.EndDateTimeMessage = "The end time must be future time"
          return false;
      }
      else if($scope.StartDate >= $scope.EndDate){
          $scope.StartDateTimeMessage = "The Start time could be late than end time"
          return false;
      }
      else
      {
           $scope.StartDateTimeMessage = "";
           $scope.EndDateTimeMessage = "";
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
      
      var searchInfo = {
      DepartureStartTime : $scope.StartDate,
      DepartureEndTime : $scope.EndDate,
      FromProvince : $scope.from_province,
      FromCity : $scope.from_city,
      FromLocation : $scope.from_location,
      ToProvince : $scope.to_province,
      ToCity : $scope.to_city,
      ToLocation : $scope.to_location }
      
      
      
    $modalInstance.close(searchInfo);  
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
                   
}]);
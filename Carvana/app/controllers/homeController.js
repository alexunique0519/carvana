'use strict';
app.controller('homeController', ['$scope', function ($scope) {

$scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    //var newWidth = 600 + slides.length + 1;
    slides.push({
      image: "app/images/trafficjam.jpg",
      text: "We Carpool - Less Traffic Jam"});
  
    slides.push({
      image: " app/images/carpool.jpg",
      text: "We Carpool - We Make Friends On The Way"});
  
    slides.push({
      image: "app/images/carpoolNature.jpg",
      text: "We Carpool - We care about Our World"});
  
    slides.push({
      image: "app/images/saveMoney.jpg",
      text: "We Carpool - We Save Our Money"});
      
  }();

}]);

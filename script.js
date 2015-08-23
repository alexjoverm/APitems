angular.module('myApp', ['ngRoute','ui.bootstrap','chart.js']);

angular.module('myApp').config(function($routeProvider){
  $routeProvider
    .when('/',
      {
        controller: 'Ctrl',
        templateUrl: 'items.html'
      })
    .when('/champions',
      {
          controller: 'Ctrl2',
          templateUrl: 'champions.html'
      })
    .otherwise({ redirectTo: '/' });
});
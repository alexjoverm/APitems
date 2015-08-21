angular.module('myApp', ['ngRoute','ui.bootstrap','chart.js']);

angular.module('myApp').config(function($routeProvider){
  $routeProvider
    .when('/',
      {
        controller: 'Ctrl',
        templateUrl: 'main.html'
      })
    .when('/myApp',
      {
          controller: 'Ctrl',
          templateUrl: 'myApp.html'
      })
    .otherwise({ redirectTo: '/' });
});
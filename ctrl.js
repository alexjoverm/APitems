angular.module('myApp').controller('Ctrl', function ($scope, $routeParams, $window) {
//graficas  
  $scope.labels = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12", "item13", "item14", "item15", "item16"];
  $scope.data1 = [[65, 59, 80, 90, 100]];
  $scope.data2 = [[80, 10, 5, 30, 20]];
  $scope.onClick = function (points, evt) {//funcion que saca los porcentajes al ponerte encima de la barra
    console.log(points, evt);
  };

//pestañas
  $scope.tabs = [
    { title:'WinRate', content:'chart1.html' },
    { title:'PickRate', content:'chart2.html'}
  ];
  //botones
  $scope.radioModel = 'Normal';
  $scope.radioModel2 = 'Bronze';

});


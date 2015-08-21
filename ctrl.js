angular.module('myApp').controller('Ctrl', function ($scope, $routeParams, $window) {

//pestañas
    
  $scope.tabs = [
    { title:'WinRate', content:'chart1.html' },
    { title:'PickRate', content:'chart2.html'}
  ];
    
  //botones
    
  $scope.radioModel = 'Normal';
  $scope.radioModel2 = 'Bronze';
    
//Graficas
    
    var winrateData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    
    var pickrateData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    
    var options = {
        
    };

  
  angular.element(document).ready(function() {
      var winrateChart = new Chart(document.getElementById('winrate-chart').getContext("2d")).Bar(winrateData,options);
      var pickrateChart = new Chart(document.getElementById('pickrate-chart').getContext("2d")).Bar(pickrateData,options);
  });
});


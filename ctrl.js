angular.module('myApp').controller('Ctrl', function ($scope, $timeout) {

  //botones

    $scope.radioModel = 'Normal';
    $scope.radioModel2 = 'Bronze';
    $scope.radioModel3 = '5.11';

//Graficas
    $scope.winrateData = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        data: [[5, 59, 80, 81, 56, 55, 40]],

    };

    $scope.pickrateData = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        data: [[28, 48, 40, 19, 86, 27, 90]],
        
    };

    //pestañas

    $scope.tabs = [
        { title:'WinRate',  data: $scope.winrateData},
        { title:'PickRate', data: $scope.pickrateData}
    ];

    $timeout(function(){
        $scope.winrateData.data = [[50, 19, 111, 81, 6, 5, 40]]
    }, 2000);
});


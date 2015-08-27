angular.module('myApp').controller('ChampionsDetailCtrl', function ($scope, $timeout, $window, ChartSvc) {
    
    //chart radar
    $scope.labelsRadar =["Jungle", "Mid", "Bot", "Top"];
    
    $scope.dataRadar = [[65, 59, 90, 81]];
    
    //chart bars
    $scope.labelsBar =["5.11", "5.14"];
    $scope.dataBar = [[40, 60]];
    

    
    $scope.Options = {
        scaleFontSize: 6,//cantidad de lineas
        scaleLineColor: "#fff",//lineas
        pointLabelFontColor : "#EFEFEF"//letras    
    }
    // Tabs
    $scope.tabs = [
        { title:'WinRate',  data: $scope.winrateData},
        { title:'PickRate', data: $scope.pickrateData},
        { title:'BanRate', data: $scope.banrateData},
        { title:'KDA', data: $scope.kdaData}
        
    ];
    $scope.tabs = [
        {title: 'WinRate', data: null },
        {title: 'PickRate', data: null },
        {title: 'BanRate', data: null },
        {title: 'KDA', data: null }
    ];

});
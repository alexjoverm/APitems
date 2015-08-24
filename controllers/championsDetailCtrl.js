angular.module('myApp').controller('ChampionsDetailCtrl', function ($scope, $timeout, $window, ChartSvc) {
    


    $scope.tabs = [
        { title:'WinRate',  data: $scope.winrateData},
        { title:'PickRate', data: $scope.pickrateData},
        { title:'BanRate', data: $scope.banrateData},
        { title:'KDA', data: $scope.kdaData}
        
    ];

    // Data

    $scope.tabs = [
        {title: 'WinRate', data: null },
        {title: 'PickRate', data: null },
        {title: 'BanRate', data: null },
        {title: 'KDA', data: null }
    ];

});
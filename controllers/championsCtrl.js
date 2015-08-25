angular.module('myApp').controller('ChampionsCtrl', function ($scope, ChartSvc) {

    //$scope.filters = ChartSvc.filters.items;
    $scope.champions = ChartSvc.getChampions();
    console.log($scope.champions)


});


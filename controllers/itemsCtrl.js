angular.module('myApp').controller('ItemsCtrl', function ($scope, $timeout, $window, ChartSvc) {

  

    // Filters
    $scope.filters = ChartSvc.filters.items;




    // Charts
    $scope.options = ChartSvc.config.chartOptions;




    console.log($scope.heroImage);

    $scope.tabs = [
        { title:'WinRate',  data: $scope.winrateData},
        { title:'PickRate', data: $scope.pickrateData}
    ];

    // Data

    $scope.tabs = [
        {title: 'Win rate', data: null },
        {title: 'Pick rate', data: null }
    ];

    $scope.$on('items-loaded', function(event, args) {
        $scope.updateItems();
        console.log($scope.itemsChart)
    });

    $scope.updateItems = function(){
        $scope.items = ChartSvc.data.items;
        $scope.labels = ChartSvc.data.itemsChart.labels;
        $scope.tabs[0].data = ChartSvc.data.itemsChart.winrate;
        $scope.tabs[1].data = ChartSvc.data.itemsChart.pickrate;
    };

    $scope.$watch('filters', function(){
        ChartSvc.getItems();
    }, true);



});

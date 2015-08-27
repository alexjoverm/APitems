angular.module('myApp').controller('ChampionsCtrl', function ($scope, $location, ChartSvc) {


    // Filters
    $scope.filters = ChartSvc.filters.champions;

    // Data
    //$scope.champions = ChartSvc.getChampions();

    $scope.order = {
        field: 'name',
        reverse: false
    };

    $scope.Order = function(field){
        if($scope.order.field != field)
            $scope.order.reverse = false;
        else
            $scope.order.reverse = !$scope.order.reverse;

        $scope.order.field = field;
    };

    $scope.GoTo = function(id){
        $location.path('/champions/' + id);
    };

    $scope.$watch('filters', function(){
        console.log('ajsls')
        $scope.champions = ChartSvc.getChampions();
    }, true);


});


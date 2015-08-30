angular.module('myApp').controller('ChampionsDetailCtrl', function ($scope, $routeParams, ChartSvc) {



    //chart radar
    $scope.labelsRadar = ["Jungle", "Mid", "Bot", "Top"];


    //chart bars
    $scope.labelsBar = ["5.11", "5.14"];
    $scope.dataBar = [[40, 60]];
    $scope.options = ChartSvc.config.chartOptions;


    $scope.options2 = {
        scaleFontSize      : 7,//cantidad de lineas
        scaleLineColor     : "#444",//lineas
        pointLabelFontColor: "#EFEFEF",//letras
        pointLabelFontSize : 12
    };

    $scope.filters = {
        queue : 'Normal',
        league: 'Gold'
    };


    $scope.tabs = [
        {title: 'Win Rate', data: null},
        {title: 'Pick Rate', data: null},
        {title: 'Ban Rate', data: null},
        {title: 'KDA', data: null}
    ];

    $scope.updateChampion = function () {

        if ($scope.champion) {
            var queue = $scope.filters.queue.toLowerCase();
            var league = $scope.filters.league.toLowerCase();

            $scope.tabs[3].data = null;

            console.log(league)

            // Cambiar array winrate, pickrate, banrate, kda
            if (league == '--all--') {
                console.log('all')
                $scope.tabs[0].data = [[$scope.champion.v5_11[queue].winrate, $scope.champion.v5_14[queue].winrate]];
                $scope.tabs[1].data = [[$scope.champion.v5_11[queue].pickrate, $scope.champion.v5_14[queue].pickrate]];
                $scope.tabs[2].data = [[$scope.champion.v5_11[queue].banrate, $scope.champion.v5_14[queue].banrate]];
                $scope.items11 = $scope.champion.v5_11.items;
                $scope.items14 = $scope.champion.v5_14.items;
            }
            else if ($scope.champion.v5_11[queue].leagues) {

                var league_11 = _.find($scope.champion.v5_11[queue].leagues, {name: league.toUpperCase()});
                var league_14 = _.find($scope.champion.v5_14[queue].leagues, {name: league.toUpperCase()});

                var win1 = 0, pick1 = 0, ban1 = 0, kda1 = 0, win2 = 0, pick2 = 0, ban2 = 0, kda2 = 0;
                if (league_11) {
                    win1 = league_11.winrate;
                    pick1 = league_11.pickrate;
                    ban1 = league_11.banrate;
                    kda1 = league_11.kda;
                }
                if (league_14) {
                    win2 = league_14.winrate;
                    pick2 = league_14.pickrate;
                    ban2 = league_14.banrate;
                    kda2 = league_14.kda;
                }

                $scope.tabs[0].data = [[win1, win2]];
                $scope.tabs[1].data = [[pick1, pick2]];
                $scope.tabs[2].data = [[ban1, ban2]];
                $scope.tabs[3].data = [[kda1, kda2]];

                league_11.items.length = 5;
                league_14.items.length = 5;

                $scope.items11 = league_11.items;
                $scope.items14 = league_14.items;
            }

            $scope.tabs[3].disabled = ($scope.tabs[3].data == null);
        }
    };


    $scope.champion = ChartSvc.getChampion($routeParams.id);

    if ($scope.champion) {
        $scope.dataRadar511 = $scope.champion.v5_11.radar;
        $scope.dataRadar514 = $scope.champion.v5_14.radar;


        console.log('all')

        $scope.updateChampion();
    }

    $scope.$watch('filters', function () {
        $scope.updateChampion();
    }, true);


});
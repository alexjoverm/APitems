angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'chart.js', 'angular-bootstrap-select']);

angular.module('myApp').config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller : 'ItemsCtrl',
            templateUrl: 'views/items.html'
        })
        .when('/champions',
        {
            controller : 'ChampionsCtrl',
            templateUrl: 'views/champions.html'
        })
        .when('/champions/:id',
        {
            controller : 'ChampionsDetailCtrl',
            templateUrl: 'views/championsDetails.html'
        })
        .otherwise({redirectTo: '/'});

    })

    .config(function(ChartJsProvider){
        ChartJsProvider.setOptions({colours: [
            '#9333f9', //purple
            '#97BBCD', // blue
            '#F7464A', // red
            '#46BFBD', // green
            '#FDB45C', // yellow
            '#949FB1', // grey
            '#4D5360'  // dark grey
        ]});
    })

    .run(function(ChartSvc){
        ChartSvc.loadJsons();
    })


    .directive('fixedHeight', function($window, $timeout){
        return{
            link: function(scope, elem, attrs){
                $($window).on('resize', function() {
                    $timeout(function(){
                        var height = $(elem).find(attrs.fixedHeight).innerHeight();
                        if(attrs.extraItem)
                            height += $(elem).find(attrs.extraItem).innerHeight();
                        $(elem).css('height', height + 'px');
                    }, 80);
                });

                scope.$on('create', function (event, chart) {
                    $($window).trigger('resize');
                });
            }
        }
    })

;
angular.module('myApp').factory('ChartSvc', function ($http, $rootScope) {

    // private
    var arrayQueues = ['normal', 'ranked'];
    var arrayLeagues = ['unranked', 'bronze', 'silver', 'gold', 'platinium', 'diamond', 'master', 'challenger'];
    var versions = ['5_11', '5_14'];

    // public
    var api = {};

    api.config = {
        jsonLoaded  : 0,
        chartOptions: {
            scaleGridLineColor: 'rgba(255,255,255,0.1)',
            scaleFontSize     : 13,
            scaleFontColor    : '#ccc'
        }
    };

    api.filters = {
        items    : {
            queue  : 'Normal',
            league : '--All--',
            version: '5.11'
        },
        champions: {
            queue  : 'Normal',
            league : '--All--',
            version: '5.11'
        }
    };

    api.data = {
        items         : null,
        champions     : null,
        itemsChart    : {
            labels  : null,
            winrate : null,
            pickrate: null
        },
        championsChart: {
            labels  : null,
            winrate : null,
            pickrate: null,
            kda     : null,
            banrate : null
        }
    };


    api.loadJsons = function () {
        $http.get('static/5.11.json').success(function (data) {
            api.json5_11 = data;
            $rootScope.$broadcast('ChartSvc:jsonLoaded', ++api.config.jsonLoaded);
        });
        $http.get('static/5.14.json').success(function (data) {
            api.json5_14 = data;
            $rootScope.$broadcast('ChartSvc:jsonLoaded', ++api.config.jsonLoaded);
        });
    };


    api.getChampions = function () {

        var jsonTarget = (api.filters.champions.version == '5.11' ? 'json5_11' : 'json5_14');

        var arrayAux = [];
        var arrTarget = api[jsonTarget].champions;
        var queue = api.filters.champions.queue.toLowerCase();

        var league = arrayLeagues.indexOf(api.filters.champions.league.toLowerCase());

        for (var i in arrTarget) {
            var champ = {};
            champ.id = arrTarget[i].id;
            champ.name = arrTarget[i].name;
            champ.img = arrTarget[i].img;
            champ.winrate = 0;
            champ.pickrate = 0;
            champ.banrate = 0;
            champ.kda = 0;

            if (arrTarget[i][queue]) {
                champ.winrate = arrTarget[i][queue].winrate;
                champ.pickrate = arrTarget[i][queue].pickrate;
                champ.banrate = arrTarget[i][queue].banrate;
                champ.kda = arrTarget[i][queue].kda;

                if (league != -1) {
                    var leagueItem = _.find(arrTarget[i][queue].leagues, {id: league});
                    if (leagueItem) {
                        champ.winrate = leagueItem.winrate;
                        champ.pickrate = leagueItem.pickrate;
                        champ.banrate = leagueItem.banrate;
                        champ.kda = leagueItem.kda;
                    }
                }
            }

            arrayAux.push(champ);
        }

        return arrayAux;
    };

    api.getItems = function () { // options: { version: 11 o 14, queue: 0, 1 (normal, ranked), league: 0 - 7 }
        if (!api.json5_11 || !api.json5_14) // if not loaded, exit
            return;

        var jsonTarget = (api.filters.items.version == '5.11' ? 'json5_11' : 'json5_14');

        var arrayAux = angular.copy(api[jsonTarget].items);

        var queue = api.filters.items.queue.toLowerCase();
        var league = arrayLeagues.indexOf(api.filters.items.league.toLowerCase());

        // Filter queue
        for (var i in arrayAux) {
            item = arrayAux[i];
            item.winrate = 0;
            item.pickrate = 0;

            // If exists that queue
            if (item[queue]) {
                if (league == -1) // no league setted
                {
                    item.winrate = item[queue].winrate;
                    item.pickrate = item[queue].pickrate;
                }
                else {
                    var leagueItem = _.find(item[queue].leagues, {id: league});
                    if (leagueItem) {
                        item.winrate = item[queue].winrate;
                        item.pickrate = item[queue].pickrate;
                    }
                }
            }
            delete item.normal;
            delete item.ranked;
        }

        api.data.items = arrayAux;
        api.data.itemsChart.labels = _.map(arrayAux, 'name');
        api.data.itemsChart.pickrate = [_.map(arrayAux, 'pickrate')];
        api.data.itemsChart.winrate = [_.map(arrayAux, 'winrate')];

        $rootScope.$broadcast('items-loaded');
    };

    return api;
});
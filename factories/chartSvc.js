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
            //league : '--All--',
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




    api.getChampions = function(){
        var arrayAux = [];
        var i = 0;

        for (var v in versions){

            console.log(v)
            console.log(versions[v])
            for (i in api['json'+versions[v]].champions){
                var champ = angular.copy(api.json5_11.champions[i]);
                champ.numItems = 0;
                champ.queues = [];

                if(champ.normal && champ.normal.items){ champ.queues.push['Normal']; champ.numItems += champ.normal.items.length; }
                if(champ.ranked && champ.ranked.items){ champ.queues.push['Ranked']; champ.numItems += champ.ranked.items.length; }

                delete champ.normal;
                delete champ.ranked;

                if(! _.some(arrayAux, { id: champ.id }))
                    arrayAux.push(champ);
            }
        }
        return arrayAux;
    };

    api.getItems = function () { // options: { version: 11 o 14, queue: 0, 1 (normal, ranked), league: 0 - 7 }
        if (!api.json5_11 || !api.json5_14) // if not loaded, exit
            return;

        var jsonTarget = (api.filters.items.version == '5.11' ? 'json5_11' : 'json5_14');

        var arrayAux = angular.copy(api[jsonTarget].items);

        var queue = api.filters.items.queue.toLowerCase();
        //var league = arrayLeagues.indexOf(api.filters.items.league.toLowerCase());

        // Filter queue
        for (var i in arrayAux) {
            item = arrayAux[i];
            item.winrate = 0;
            item.pickrate = 0;

            // If exists that queue
            if (item[queue]) {
                //if (league == -1) // no league setted
                //{
                item.winrate = item[queue].winrate;
                item.pickrate = item[queue].pickrate;
                //}
                //else {
                //    var leagueItem = _.find(item[queue].leagues, {id: league});
                //    if (leagueItem) {
                //        item.winrate = item[queue].winrate;
                //        item.pickrate = item[queue].pickrate;
                //    }
                //}
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
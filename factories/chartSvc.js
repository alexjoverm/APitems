angular.module('myApp').factory('ChartSvc', function ($http, $rootScope, $location) {

    // private
    var arrayQueues = ['normal', 'ranked'];
    var arrayLeagues = ['unranked', 'bronze', 'silver', 'gold', 'platinium', 'diamond', 'master', 'challenger'];
    var versions = ['5_11', '5_14'];

    function AddItems(champion){
        var v5_11 = [];

        for(var i in champion.v5_11.normal.leagues){
            var league = champion.v5_11.normal.leagues[i];
            for(var j in league.items){
                var item = _.merge({}, league.items[i]);
                var index = _.findIndex(v5_11, {id: item.id});
                if(index != -1){
                    if(item.pickrate > v5_11[index].pickrate)
                        v5_11[index] = item;
                }
                else
                    v5_11.push(item);
            }
        }
        for(var i in champion.v5_11.ranked.leagues){
            var league = champion.v5_11.ranked.leagues[i];
            for(var j in league.items){
                var item = _.merge({}, league.items[i]);
                var index = _.findIndex(v5_11, {id: item.id});
                if(index != -1){
                    if(item.pickrate > v5_11[index].pickrate)
                        v5_11[index] = item;
                }
                else
                    v5_11.push(item);
            }
        }

        var v5_14 = [];

        for(var i in champion.v5_14.normal.leagues){
            var league = champion.v5_14.normal.leagues[i];
            for(var j in league.items){
                var item = _.merge({}, league.items[i]);
                var index = _.findIndex(v5_14, {id: item.id});
                if(index != -1){
                    if(item.pickrate > v5_14[index].pickrate)
                        v5_14[index] = item;
                }
                else
                    v5_14.push(item);
            }
        }
        for(var i in champion.v5_14.ranked.leagues){
            var league = champion.v5_14.ranked.leagues[i];
            for(var j in league.items){
                var item = _.merge({}, league.items[i]);
                var index = _.findIndex(v5_14, {id: item.id});
                if(index != -1){
                    if(item.pickrate > v5_14[index].pickrate)
                        v5_14[index] = item;
                }
                else
                    v5_14.push(item);
            }
        }

        v5_11.sort(function (a, b) {
            if (a.pickrate > b.pickrate) return 1;
            else return -1;
        });
        v5_14.sort(function (a, b) {
            if (a.pickrate > b.pickrate) return 1;
            else return -1;
        });

        if(v5_11.length > 5) v5_11.length = 5;
        if(v5_14.length > 5) v5_14.length = 5;

        champion.v5_11.items = v5_11;
        champion.v5_14.items = v5_14;
    }


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
            console.log(data.champions[0])
            $rootScope.$broadcast('ChartSvc:jsonLoaded', ++api.config.jsonLoaded);
        });
        $http.get('static/5.14.json').success(function (data) {
            api.json5_14 = data;
            $rootScope.$broadcast('ChartSvc:jsonLoaded', ++api.config.jsonLoaded);
        });
    };


    api.getChampion = function (id) {

        if(api.config.jsonLoaded < 2) {
            $location.path('/');
            return;
        }

        var arr511 = api.json5_11.champions;
        var arr514 = api.json5_14.champions;

        console.log(id);
        console.log(arr511[0]);
        console.log(arr514[0]);

        var aux511 = _.merge({}, _.find(arr511, { 'id' : parseInt(id)}));
        var aux514 = _.merge({}, _.find(arr514, { 'id' : parseInt(id)}));

        var champion = _.pick(aux511, ['id', 'name', 'subtitle', 'img']);

        champion.v5_11 = {
            radar: [[aux511.jungleRate, aux511.midRate, aux511.botRate, aux511.topRate]],
            normal: aux511.normal,
            ranked: aux511.ranked
        };
        champion.v5_14 = {
            radar: [[aux514.jungleRate, aux514.midRate, aux514.botRate, aux514.topRate]],
            normal: aux514.normal,
            ranked: aux514.ranked
        };

        AddItems(champion);
        console.log(champion)
        return champion;
    };

    api.getChampions = function () {

        if(api.config.jsonLoaded < 2) {
            $location.path('/');
            return;
        }

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

        if(api.config.jsonLoaded == 2){
            var jsonTarget = (api.filters.items.version == '5.11' ? 'json5_11' : 'json5_14');
            var queue = api.filters.items.queue.toLowerCase();
            var league = arrayLeagues.indexOf(api.filters.items.league.toLowerCase());

            var arrayAux = [];


            // Filter queue
            for (var i in api[jsonTarget].items) {
                var item = {};
                item.id = api[jsonTarget].items[i].id;
                item.name = api[jsonTarget].items[i].name;
                item.img = api[jsonTarget].items[i].img;
                item.winrate = 0;
                item.pickrate = 0;

                // If exists that queue
                if (api[jsonTarget].items[i][queue]) {

                    item.winrate = api[jsonTarget].items[i][queue].winrate;
                    item.pickrate = api[jsonTarget].items[i][queue].pickrate;

                    if (league != -1) {
                        var leagueItem = _.find(api[jsonTarget].items[i][queue].leagues, {id: league});
                        if (leagueItem) {
                            item.winrate = leagueItem.winrate;
                            item.pickrate = leagueItem.pickrate;
                        }
                    }
                }
                arrayAux.push(item);
            }

            api.data.items = arrayAux;
            api.data.items.sort(function (a, b) {
                if (a.name > b.name) return 1;
                else return -1;
            });
            api.data.itemsChart.labels = _.map(arrayAux, 'name');
            api.data.itemsChart.pickrate = [_.map(arrayAux, 'pickrate')];
            api.data.itemsChart.winrate = [_.map(arrayAux, 'winrate')];

            $rootScope.$broadcast('items-loaded');
        }
    };

    return api;
});
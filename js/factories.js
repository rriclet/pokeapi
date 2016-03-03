app.factory('pokemonFactory', ['$http', function ($http) {
    var search = {};
    search.getInfo = function (url) {
        return $http.get(url)
    }
    return search;
}])

app.factory('pokemonListFactory', ['$resource', function ($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/')
}])

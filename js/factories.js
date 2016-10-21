app.factory('pokemonFactory', function ($http) {
    var search = {};
    search.getInfo = function (url) {
        return $http.get(url)
    }
    return search;
})

app.factory('pokemonListFactory', function ($http) {
    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=811')
})

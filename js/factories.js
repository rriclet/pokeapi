app.factory('pokemonFactory', ['$http', function ($http) {
    var search = {};
    search.getInfo = function (url) {
        return $http.get(url)
    }
	/*
    search.getSprite = function (id) {
        id = id + 1
        return $http.get('http://pokeapi.co/api/v1/sprite/' + id + '/')
    }
	*/
    return search;
	
}])

app.factory('pokemonListFactory', ['$resource', function ($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/')
}])
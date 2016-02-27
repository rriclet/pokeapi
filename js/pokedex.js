var app = angular.module('app', ['ngResource'])

// a filter to upperCase words
app.filter('titleCase', function () {
    return function (input) {
        input = input || ''
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }
})

app.factory('getPokemonById', ['$http', function ($http) {
    var search = {};
    search.get = function (url) {
        var promise = $http.get(url).then(function (response) {
            return response.data
        })
        return promise
    }
    return search;
}])

app.factory('getPokemons', ['$resource', function ($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/')
}])

app.controller('searchPokemon', ['$scope', 'pokemonService', 'getPokemonById', 'getPokemons', function ($scope, pokemonService, getPokemonById, getPokemons) {

    // input to filter the pokemon list
    $scope.searchInput
    // the chosed pokemon in the list (name & url)
    $scope.chosedPokemon
    // the pokemon list
    $scope.pokemonList

    getPokemons.query().$promise.then(function (value) {
        $scope.pokemonList = value
    })

    $scope.go = function () {
        getPokemonById.get($scope.chosedPokemon.url).then(function (response) {
            pokemonService.setPokemon(response)
        })
    }
}])

app.controller('displayPokemon', ['$scope', 'pokemonService', function ($scope, pokemonService) {

    // varialbe used in the HTML page
    $scope.pokemon

    // watches if the pokemon in service changes
    $scope.$watch(
        // the watched value
        function () {
            return pokemonService.pokemon
        },
        // what to do if the value has changed
        function (newVal, oldVal) {
            if (typeof newVal !== undefined) {
                $scope.pokemon = pokemonService.pokemon
            }
        }
    )

}])

app.service('pokemonService', [function () {
    var pokemon;

    this.setPokemon = function (pokemon) {
        this.pokemon = pokemon
    }

}])
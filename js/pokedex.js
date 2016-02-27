var app = angular.module('app', ['ngResource'])

// useful for HTML templating
app.directive('pokedex', function () {
    return {
        templateUrl: 'pokedex.html'
    }
})

// a filter to upperCase words
app.filter('titleCase', function () {
    return function (input) {
        input = input || ''
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }
})

app.factory('getPokemon', ['$http', function ($http) {
    var search = {};
    search.getInfo = function (url) {
        return $http.get(url)
    }
    search.getSprite = function (id) {
        id = id + 1
        return $http.get('http://pokeapi.co/api/v1/sprite/' + id + '/')
    }
    return search;
}])

app.factory('getPokemonList', ['$resource', function ($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/')
}])

app.controller('searchPokemon', ['$scope', 'pokemonService', 'getPokemon', 'getPokemonList', function ($scope, pokemonService, getPokemon, getPokemonList) {

    // input to filter the pokemon list
    $scope.searchInput
        // the chosed pokemon in the list (name & url)
    $scope.chosedPokemon
        // the pokemon list
    $scope.pokemonList

    getPokemonList.query().$promise.then(function (value) {
        $scope.pokemonList = value
    })

    // when the button is clicked
    $scope.go = function () {
        getPokemon.getInfo($scope.chosedPokemon.url).then(function (pokemon) {
            getPokemon.getSprite(pokemon.data.id).then(function(sprite) {
                pokemonService.setPokemon(pokemon.data)
                pokemonService.setPokemonSprite(sprite.data.image)
            })
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
    var pokemon

    this.setPokemon = function (pokemon) {
        this.pokemon = pokemon
    }

    this.setPokemonSprite = function (sprite) {
        this.pokemon.sprite = 'http://pokeapi.co' + sprite
    }

}])
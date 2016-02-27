var app = angular.module('app', ['ngResource'])

app.filter('titleCase', function() {
    return function(input) {
      input = input || ''
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
    }
})

app.factory('getPokemonById', ['$resource', function($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/:id/')
}])

app.factory('getPokemons', ['$resource', function($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/')
}])

app.controller('ctrl', ['$scope', '$log', 'getPokemonById', 'getPokemons', function($scope, $log, getPokemonById, getPokemons) {

	// Define initial values
	$scope.inputPokemonInfo
	$scope.currentPokemon
	$scope.pokemonList
	
	var pokemonListResponse = getPokemons.query()
	pokemonListResponse.$promise.then(function(value) {
		$scope.pokemonList = pokemonListResponse
	})
	
	$scope.go = function() {
		var response = getPokemonById.get({id: $scope.choice.id})
		response.$promise.then(function(value) {
			$log.log('API called, waiting !')
			$scope.currentPokemon = value
		})
	}
}])
	

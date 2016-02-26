var app = angular.module('app', ['ngResource']);

app.factory('getPokemonById', ['$resource', function($resource) {
    return $resource('http://pokeapi.co/api/v2/pokemon/:id/');
}]);

app.controller('ctrl', ['$scope', '$log', 'getPokemonById', function($scope, $log, getPokemonById) {

	// Define initial values
	$scope.inputPokemonInfo
	$scope.currentPokemon
	
	$scope.list = [
		{id:1,
			"name": "Bulbasaur",
			"url": ""},
		{id:2,
			"name": "Ivysaur",
			"url": ""
		},
		{id:3,
			"name": "Venusaur",
			"url": ""
		},
		{id:4,
			"name": "Squirtle",
			"url": ""
		}
	]

	$scope.choice;

	$scope.go = function() {
		var response = getPokemonById.get({id: $scope.choice.id});
		response.$promise.then(function(value) {
			$log.log('API called, waiting !')
			$scope.currentPokemon = value
		});
	};
	
}]);
	

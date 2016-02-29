app.controller('searchPokemon', ['$scope', 'pokemonService', 'pokemonFactory', 'pokemonListFactory', function ($scope, pokemonService, pokemonFactory, pokemonListFactory) {
    // input to filter the pokemon list
    $scope.searchInput
        // the chosed pokemon in the list (name & url)
    $scope.chosedPokemon
        // the pokemon list
    $scope.pokemonList

    pokemonListFactory.query().$promise.then(function (value) {
        $scope.pokemonList = value
    })

    // when the button is clicked
    $scope.go = function () {
        pokemonFactory.getInfo($scope.chosedPokemon.url).then(function (pokemon) {
                pokemonService.setPokemon(pokemon.data)
				if (pokemon.data.id <= 649)
					pokemonService.setPokemonSprite('http://img.pokemondb.net/sprites/black-white/anim/normal/' + pokemon.data.name + '.gif')
				else
					pokemonService.setPokemonSprite('http://img.pokemondb.net/sprites/x-y/normal/' + pokemon.data.name + '.png')
				
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
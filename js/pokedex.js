angular.
    module('app', []).
        controller('ctrl', [ function($scope, $log, $resource, pokeapi) {

        // Define initial values
        $scope.searchPokemon;
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
        ];

        $scope.choice;

        $scope.go = function() {
            $log.log($scope.choice);
        };
    }]).
    factory('getPokemon', [function($resource) {
        return $resource('http://pokeapi.co/api/v2/pokemon/:id/', { id: '@_id' }, {
            get: {
                method: 'GET'
            }
        });
    }]);
var app = angular.module('app', ['ngResource'])

// useful for HTML templating
app.directive('pokedex', function () {
    return {
        templateUrl: 'pokedex.html'
    }
})
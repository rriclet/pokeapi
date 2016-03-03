var app = angular.module('app', ['ngResource', 'localytics.directives'])

// useful for HTML templating
app.directive('pokedex', function () {
    return {
        templateUrl: 'pokedex.html'
    }
})
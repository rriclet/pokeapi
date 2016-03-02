app.service('pokemonService', [function () {
    var pokemon
    this.setPokemon = function (pokemon) {
        this.pokemon = pokemon
    }
    this.setPokemonSprite = function (sprite) {
        this.pokemon.sprite = sprite
    }
}])
app.service('pokemonService', [function () {
    var pokemon = {}
    pokemon.sprite = null
    pokemon.sprite = null

    this.setPokemon = function (pokemon) {
        this.pokemon = pokemon
    }
    this.setPokemonSprite = function (sprite) {
        this.pokemon.sprite = sprite
    }
}])
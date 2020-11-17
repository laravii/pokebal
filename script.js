//selecionar pokebola, input e capturar valor e botão
const pokebola = document.querySelector('.pokebola')
const searchInput = document.querySelector('.searchPokemonInput')
const searchBtn = document.querySelector('.searchPokemon')

//pegar o elemento HTML que onde será renderizado o resultado
const pokemonResult = document.querySelector('.result')
var pokemon;
var card;
var searchingPokemon;
var pokename;
//url da API quando for sorteio

//url da API quando for pesquisado
const urlBase = `https://pokeapi.co/api/v2/pokemon/`


//fazer requisição da API
function getPokemon(url, poke) {
    fetch(url+poke)
    .then((res) => res.json())
    .then((data) => pokemon = data)
    .catch((err)=>console.log(err))
}

//criar resultado que vai aparecer em tela
const creatingCard = () =>{
    pokemonResult.innerHTML = ' '
    card=`<div class='pokemonHere' styles='position: absolute;'>
            <div class='img'>
                <img src='${pokemon.sprites.front_default}'>
            </div>
            <div class='poke-infos'>
                <h3>Pokemon number: ${pokemon.id}</h3>
                <h3>Pokemon name: ${pokemon.name}</h3>
                <h4>Type: ${pokemon.types.map(item => ' ' + String(item.type.name)) }</h4>
                <h4>Skills: ${pokemon.moves.map(item => ' ' + String(item.move.name))}</h4>
                <h4>Weight: ${pokemon.weight / 10}kg</h4>
                <h4>Height: ${pokemon.height /10}m</h4>
            </div>
         </div>`
        return card        
}

function searchPokemon(pokename){
    getPokemon(urlBase, pokename)
    
    pokebola.classList.add('openingPokeBola')
    setTimeout(()=>{
        pokemonResult.innerHTML = ' '
        pokemonResult.innerHTML = creatingCard();
        }
    , 2000)

    setTimeout(() =>{
        pokebola.classList.remove('openingPokeBola')
    }, 2500)
}

pokebola.addEventListener('click', e =>{
    e.preventDefault()
    pokename = Math.ceil(Math.random()*1050)
    searchPokemon(pokename)
})

searchBtn.addEventListener('click', e =>{
    e.preventDefault()
    pokename = searchInput.value.toLowerCase()
    searchPokemon(pokename)
    searchInput.value = ''

})


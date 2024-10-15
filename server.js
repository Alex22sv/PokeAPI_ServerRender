const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;
const baseURL = 'https://pokeapi.co/api/v2';
const app = express();

// Lista
let pokemons = [];

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('main', {pokemons});
});
app.post('/search', async (req, res) => {
  const { pokemon } = req.body;

  fetch(`${baseURL}/pokemon-form/${pokemon}`)
  .then(response => response.json())
  .then(poke => {
    if(!poke){
      console.log("Empty input");
      res.status(404).send("Empty input");
    } else {
      let flag = false;
      for(let i = 0; i < pokemons.length; i++){
        if(pokemons[i].id == poke.id){
          flag = true;
        }
      }
      if(!flag) {
        let new_pokemon = {
          id: poke["id"],
          name: poke["name"],
          img: poke.sprites["front_default"]
        }
        pokemons.push(new_pokemon);
      }
      flag = false;
      res.redirect('/');
    }
  }).catch(e => {
    console.log(e);
    res.status(500).send(e);
  })
});
app.get('/edit/:id', (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === pokemonId);
  if(pokemon) {
    res.render('edit', {pokemon});
  }
});
app.post('/delete/:id', (req, res) => {
  const pokemonId = parseInt(req.params.id);
  pokemons = pokemons.filter(p => p.id !== pokemonId);
  res.redirect('/');
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
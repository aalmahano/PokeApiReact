// Obtener los 30 primeros pokemons desde el 0
// https://pokeapi.co/api/v2/pokemon?limit=30&offset=0
// Obtenemos el nombre y la url
// https://pokeapi.co/api/v2/pokemon/1/
// De aquí sacamos los types
// https://pokeapi.co/api/v2/evolution-chain/7
// obtenemos de quien evoluciona

async function getPokemonList(limit, offset) {
  try {
    const pokeList = await fetchUrl(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = [];
    for (let i = 0; i < pokeList.results.length; i++) {
      const pokemon = await fetchUrl(pokeList.results[i].url);
      const evolucion = await fetchUrl(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`,
        "evolution"
      );
      pokemon.evolves_from = evolucion.evolves_from_species;
      data.push(pokemon);
      //console.log(pokemon)
    }
    return data;
  } catch (error) {
    console.error(`Ha ocurrido un error: ${error}`);
  }
}

function fetchUrl(url, type) {
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((response) => {
          //console.log(response);
          if (!response.ok) {
            if (response.status === 404 && type == "evolution") {
              const data = { evolves_from_species: null };
              return data;
            } else {
              endLoader();
              throw new Error(
                `Error al solicitar la url ${url} con status ${response.status}`
              );
            }
          }
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          resolve(data);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

export { getPokemonList };

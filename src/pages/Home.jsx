import { useState, useEffect } from "react";
import { getPokemonList } from "../services/pokeApiService";
import { PokemonCard } from "../components/PokemonCard";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const eventHandler = () => setOffset(offset + 40);

  useEffect(() => {
    window.addEventListener("scrollend", eventHandler);
    async function fetchPokemon() {
      const pokemonFromApi = await getPokemonList(40, offset);
      setPokemonList(pokemonList.concat(pokemonFromApi));
      return pokemonFromApi;
    }

    fetchPokemon();

    () => window.removeEventListener("scrollend", eventHandler);
  }, [offset]);

  return (
    <>
      <div className="ear__left"></div>
      <div className="ear__right"></div>
      <div className="cheek__left"></div>
      <div className="cheek_right"></div>
      <div id="pokeList" className="pokecards">
        <div className="pokecards__filter">
          <input
            type="search"
            placeholder="Filtra Pokemon por nombre..."
            id="pokeFilter"
            className="pokeInputFilter"
          />
        </div>
        {pokemonList.map((pokemon) => {
          return <PokemonCard key={pokemon.name} data={pokemon} />;
        })}
      </div>
    </>
  );
}

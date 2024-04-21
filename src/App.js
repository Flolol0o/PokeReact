import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [page, setPage] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemons();
  }, [page]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`);
      const data = await response.json();
      setPokemonList(data.results);
      const details = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
      setPokemonDetails(details);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      setIsLoading(false);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        name: data.name,
        imageUrl: data.sprites.front_default,
        types: data.types,
        height: data.height,
        weight: data.weight
      };
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return null;
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handlePokemonClick = (id) => {
    setSelectedPokemon(pokemonDetails[id]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokedex</h1>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <body>
        {selectedPokemon ? (
          <div>
            <h1>{selectedPokemon.name}</h1>
            <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
            <p>Type: {selectedPokemon.types[0].type.name}</p>
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <button onClick={() =>setSelectedPokemon(null)}>Back</button>
          </div>
        ) : (
          <div>
          <table className="pokemon-table">
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : (
                Array.from({ length: 4 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 5 }).map((_, colIndex) => {
                      const pokemonIndex = rowIndex * 5 + colIndex;
                      const pokemon = pokemonDetails[pokemonIndex];
                      if (!pokemon || !pokemon.types) return null;

                      return (
                        <td onClick={() => handlePokemonClick(pokemonIndex)} key={colIndex}>
                          <div className={pokemon.types[0].type.name}>
                            <img src={pokemon.imageUrl} alt={pokemon.name} />
                            <p>{pokemon.name}</p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button onClick={prev} disabled={page === 0}>Previous</button>
          <button onClick={next}>Next</button>
          </div>
        )}
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;

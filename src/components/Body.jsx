import React, { useEffect, useState } from "react";
import "../App.css";
import Card from "./Card";

function Body() {
  const [pokemonData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await res.json();

        const uniquePokeData = await Promise.all(
          data?.results?.map(async (item) => {
            const res = await fetch(item.url);
            return res.json();
          })
        );

        // Filter duplicates based on ID
        const filteredPokeData = uniquePokeData.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id)
        );

        setPokeData(filteredPokeData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    }

    getData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredPokemon =
    filterType === "all"
      ? pokemonData
      : pokemonData.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === filterType)
        );

  return (
    <div className="body">
      <div>
        <div className="filter">
          <label htmlFor="typeFilter">Filter by Type:</label>
          <select
            id="typeFilter"
            onChange={handleFilterChange}
            value={filterType}
          >
            <option value="all">All</option>
            <option value="bug">Bug</option>
            <option value="electric">Electric</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>
        </div>
      </div>

      {loading && <p className="load-n-error">Loading...</p>}
      {error && <p className="load-n-error">404 Not found</p>}

      {!loading && !error && (
        <div className="container">
          {filteredPokemon.map((pokemon) => (
            <Card key={pokemon.id} data={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Body;

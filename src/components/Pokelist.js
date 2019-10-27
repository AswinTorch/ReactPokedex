import React, { useEffect, useState } from "react";
import Pokecard from "./Pokecard";
import axios from "axios";

const Pokelist = () => {
  const [listUrl, setListUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const [pokemon, setPokemon] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(listUrl);
    setPokemon(res.data["results"]);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <React.Fragment>
      {pokemon ? (
        <div className="row">
          {pokemon.map(pokemon => (
            <Pokecard 
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}/>
          ))}
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
    </React.Fragment>
  );
};

export default Pokelist;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

const Pokemon = props => {
  // State
  const [name, setName] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState({
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    specialAttack: "",
    specialDefense: ""
  });
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  //End state

  const fetchData = async () => {
    const { pokemonIndex } = props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    // Setting the stats
    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });
    setStats({hp, attack, defense, speed, specialAttack, specialDefense});

    // Setting the rest of the information
    setPokemonIndex(pokemonIndex);
    setName(name);
    setImageUrl(imageUrl);
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
    setHeight(height);
    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;
    setWeight(weight);
    const types = pokemonRes.data.types.map(type => type.type.name);
    setTypes(types);
    await axios.get(pokemonSpeciesUrl).then(res => {
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          setDescription(flavor.flavor_text);
          return 1;
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">{pokemonIndex}</div>
            <div className="col-7">
              <div className="float-right">
                {types.map(type => (
                  <span
                    key={type}
                    className="badge badge-pill badge-primary mr-1"
                    style={{
                      background: `#${TYPE_COLORS[type]}`,
                      color: "white"
                    }}
                  >
                    {type
                      .toLowerCase()
                      .split(" ")
                      .map(
                        letter =>
                          letter.charAt(0).toUpperCase() + letter.substring(1)
                      )
                      .join(" ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col md-3">
              <img
                src={imageUrl}
                alt={name}
                className="card-img-top rounded mx-auto mt-2"
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">
                {name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    letter =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h4>

              <p>Height: {height} ft.</p>
              <p>Weight: {weight} lbs.</p>

              <div className="row align-items-center">
                <div className="col-12 col-md-3">HP</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.hp}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Attack</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.attack}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Defense</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.defense}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.defense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Speed</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.speed}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.speed}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Special Attack</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.specialAttack}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.specialAttack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Special Defense</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${stats.specialDefense}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.specialDefense}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="p-4">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          Data from{" "}
          <a
            href="https://pokeapi.co/"
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeAPI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

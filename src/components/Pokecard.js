import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import poke from '../assets/poke.gif'

//Styles
const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;
const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

//Component
const Pokecard = props => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  useEffect(() => {
    const pokemonIndex = props.url.split("/")[props.url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    setName(props.name);
    setImageUrl(imageUrl);
    setPokemonIndex(pokemonIndex);
  }, [props.url, props.name]);

  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <StyledLink to={`pokemon/${pokemonIndex}`}>
        <Card className="card">
          <h5 className="card-header">{pokemonIndex}</h5>
          {imageLoading ? (
            <img
              alt="spinner"
              src={poke}
              style={{ width: "5em", height: "5em" }}
              className="card-img-top rounded mx-auto d-block mt-2"
            ></img>
          ) : null}
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            src={imageUrl}
            onLoad={() => setImageLoading(false)}
            onError={() => setTooManyRequests(true)}
            style={
              tooManyRequests
                ? { display: "none" }
                : imageLoading
                ? null
                : { display: "block" }
            }
          ></Sprite>

          {tooManyRequests ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">
                Too many requests!
              </span>
            </h6>
          ) : null}
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {name
                .toLowerCase()
                .split(" ")
                .map(
                  letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(" ")}
            </h6>
          </div>
        </Card>
      </StyledLink>
    </div>
  );
};

export default Pokecard;

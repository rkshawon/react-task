import { useEffect, useState } from "react";
import "../style/body.css";
import Card from "./Card";

function Body() {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const data = await res.json();
        setPokeData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <div className="container">
      <Card />
    </div>
  );
}

export default Body;

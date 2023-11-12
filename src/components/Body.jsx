import { useEffect, useState } from "react";
import "../style/body.css";

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
      <img src={pokeData?.sprites?.front_default} alt="" />
    </div>
  );
}

export default Body;

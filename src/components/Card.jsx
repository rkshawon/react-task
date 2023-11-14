import "../App.css";

export default function Card({ data }) {
  console.log(data);
  return (
    <div className="card_container">
      <img src={data?.sprites?.front_default} alt="" />
      <div className="name">Name: {data?.name}</div>

      <div className="type">Type: {data?.types[0].type.name}</div>
      <div className="height">Height: {data?.height}</div>
    </div>
  );
}

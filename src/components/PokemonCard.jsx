import { Link } from "react-router-dom";

export function PokemonCard({ data }) {
  return (
    <Link className="pokecards__card" to={"/pokemon/" + data.id}>
      <section className="pokecards__background">
        {data.sprites.front_default === null ? (
          <img
            src={data.sprites.other.showdown.front_default}
            alt={data.name}
          />
        ) : (
          <img src={data.sprites.front_default} alt={data.name} />
        )}
      </section>
      <section className="pokecards__id">ID / {data.id}</section>
      <h4 className="pokecards__name">{data.name}</h4>
      <ul className="pokecards__types">
        {data.types.map((current) => {
          console.log(current);
          return (
            <li key={current.type.name}>{current.type.name.toUpperCase()}</li>
          );
        })}
      </ul>
      {data.evolves_from ? (
        <section className="pokecards__evolution">
          <h6>Evoluciona de:</h6>
          <h4>{data.evolves_from.name}</h4>
        </section>
      ) : (
        <section className="pokecards__evolution--empty"></section>
      )}
    </Link>
  );
}

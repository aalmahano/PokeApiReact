import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  return (
    <>
      <p>Pokemon con id {id} </p>
    </>
  );
}

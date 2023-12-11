import { useParams } from "react-router-dom";
import useSuperhero from "../hooks/useSuperhero";
const RQFsuperherodetails = () => {
  const { id } = useParams();
  console.log(id, "before");
  const { isLoading, isError, data, error } = useSuperhero(id);
  console.log(id, "after");
  console.log(isLoading, isError, data, error);
  return (
    <>
      {isLoading ? (
        <p>Loading data ...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap:'1rem',
            color: "white",
            background: "red",
            borderRadius: "2rem",
            padding: ".5rem 2rem",
            margin: "3rem 20rem",
            fontFamily: "cursive",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <p>{data?.data?.id}</p>
          <p>{data?.data?.superhero}</p>
          <p>{data?.data?.first_appearance}</p>
        </div>
      )}
    </>
  );
};

export default RQFsuperherodetails;

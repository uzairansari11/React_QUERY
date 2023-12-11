import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const RQFsuperhero = () => {
  const { data, isLoading, isError, error } = useQuery(
    "super-hero-data",
    () => axios.get("http://localhost:8080/superheros"),
    {
      cacheTime: 10000, 
      staleTime:300000,
    }
  );

  return (
    <div>
      <p style={{ fontWeight: "bolder", fontSize: "30px", color: "red" }}>
        Superheros List RQF
      </p>
      {isLoading ? (
        <h3>Loading the data ....</h3>
      ) : isError ? (
        <h3>{error.message}</h3>
      ) : (
        data?.data.length &&
        data.data.map((ele) => <p key={ele.id}>{ele.name}</p>)
      )}
    </div>
  );
};

export default RQFsuperhero;

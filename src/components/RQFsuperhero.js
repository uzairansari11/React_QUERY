import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import "../App.css";
import { Link } from "react-router-dom";
const RQFsuperhero = () => {
  const [pooling, setPooling] = useState(3000);

  const onSuccess = (data) => {
    // console.log(data,"i am data")
    // console.log(" i am inside onSuccess function ");
    if (data?.length === 4) {
      setPooling(false);
    }
  };
  const onError = (error) => {
    setPooling(false);
  };
  const { data, isLoading, isError, error, refetch } = useQuery(
    "super-hero-data",
    () => axios.get("http://localhost:8080/superheros"),
    {
      // cacheTime: 10000,
      // staleTime: 300000,
      // enabled: false,
      refetchOnMount: true,
      refetchOnWindowFocus: "always",
      // refetchInterval: pooling,
      // refetchIntervalInBackground: true,
      onSuccess,
      onError,
      select: (data) => {
        const superheroName = data.data.map((ele) => {
          return { superhero: ele.superhero, id: ele.id };
        });
        console.log(superheroName, "superhero name");
        return superheroName;
      },
    }
  );

  return (
    <div>
      <h3 style={{ color: "red", textDecorationLine: "underline" }}>
        Superhero List
      </h3>
      {/* <p style={{ fontWeight: "bolder", fontSize: "30px", color: "red" }}>
        Superheros List RQF
      </p>
      <button
        style={{
          color: "white",
          background: "red",
          padding: "0.5rem 2rem",
          borderRadius: "0.2rem",
          border: "none",
        }}
        onClick={refetch}
      >
        Fetch Superheroes Data
      </button> */}
      {isLoading ? (
        <h3>Loading the data ....</h3>
      ) : isError ? (
        <h3>{error.message}</h3>
      ) : (
        // data?.data.length &&
        // data.data.map((ele) => <p key={ele.id}>{ele.name}</p>)

        data?.length &&
        data.map((ele) => (
          <Link to={`/req/superheros/${ele.id}`}>
            <p key={ele.id} className="App-hero">
              {ele.superhero}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default RQFsuperhero;

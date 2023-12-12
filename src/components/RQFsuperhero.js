import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import "../App.css";
import { Link } from "react-router-dom";
import useAddSuperhero from "../hooks/useAddSuperhero";
import { ToastContainer, toast } from "react-toastify";
const RQFsuperhero = () => {
  const [pooling, setPooling] = useState(3000);
  const [inputField, setInputField] = useState({
    superhero: "",
    publisher: "",
    alter_ego: "",
    first_appearance: "",
    characters: "",
  });
  const { mutate, isLoading:newLoading, isError:newIsError, error:newError } = useAddSuperhero();
  const handleSubmit = () => {
    mutate(inputField);
  };
  if (newIsError) {
    toast(newError.message);
  }
  const onSuccess = (data) => {
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
        return superheroName;
      },
    }
  );

  return (
    <div>
      <>
        <p>Add Superhero</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            alignItems: "center",
            gap: "0.4rem",
            margin: "auto",
          }}
        >
          <input
            placeholder="superhero name"
            value={inputField.superhero}
            onChange={(e) =>
              setInputField({ ...inputField, superhero: e.target.value })
            }
          />
          <input
            placeholder="publisher"
            value={inputField.publisher}
            onChange={(e) =>
              setInputField({ ...inputField, publisher: e.target.value })
            }
          />
          <input
            placeholder="alter_ego"
            value={inputField.alter_ego}
            onChange={(e) =>
              setInputField({ ...inputField, alter_ego: e.target.value })
            }
          />
          <input
            placeholder="first_appearance"
            value={inputField.first_appearance}
            onChange={(e) =>
              setInputField({ ...inputField, first_appearance: e.target.value })
            }
          />
          <input
            placeholder="characters"
            value={inputField.characters}
            onChange={(e) =>
              setInputField({ ...inputField, characters: e.target.value })
            }
          />
        </div>
        <button
          style={{
            color: "white",
            background: "red",
            padding: "0.5rem 4rem",
            borderRadius: "2rem",
            marginTop: "1rem",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          onClick={handleSubmit}
        >
          {newLoading ? "Posting .. " : "Add"}
        </button>
      </>
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
          <Link to={`/req/superheros/${ele.id}`} key={ele.id}>
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

import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const Paginated = () => {
  const fetcherFunction = (page) => {
    return axios.get(`http://localhost:8080/colors?_limit=2&_page=${page}`);
  };

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ["paginatedData", page],
    () => fetcherFunction(page),
    {
      keepPreviousData: true,
    }
  );

  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: "2rem",
    marginTop: "2rem",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    outline: "none",
    fontWeight: "bold",
  };

  return (
    <div>
      <p>Paginated</p>
      {isLoading ? (
        <p>Loading Data ...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        data?.data?.map((ele) => (
          <div key={ele.id}>
            <p>Color Name : {ele.color || "N/A"}</p>
          </div>
        ))
      )}
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          style={buttonStyle}
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(data?.headers.get("X-Total-Count") / 2)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginated;

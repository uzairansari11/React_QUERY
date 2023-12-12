import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const Infinite = () => {
  const [totalPage, setTotalPage] = useState(1);

  const fetcherFunction = ({ pageParam = 1 }) => {
    return axios.get(
      `http://localhost:8080/colors?_limit=2&_page=${pageParam}`
    );
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetched,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery("infinite-query", fetcherFunction, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < Math.ceil(totalPage / 2)) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    setTotalPage(data?.pages[0]?.headers?.get("x-total-count"));
  }, [data?.pages]);

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
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
        data?.pages?.map((page) => (
          <div key={page.id}>
            {page.data.map((item) => (
              <p key={item.id}>{item.color}</p>
            ))}
          </div>
        ))
      )}
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          disabled={!hasNextPage}
          onClick={fetchNextPage}
        >
          {isFetched && isFetchingNextPage ? "Loading.." : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default Infinite;

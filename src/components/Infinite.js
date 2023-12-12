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

  var {
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
  // const res = useQuery(["paginatedData", page], () => fetcherFunction(page));
//   console.log(data?.pages, "i am header");
  useEffect(() => {
    setTotalPage(data?.pages[0]?.headers?.get("x-total-count"));
  }, [data?.pages]);
  
  return (
    <div>
      <p>Paginated</p>
      {isLoading ? (
        <p>Loading Data ...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        data?.pages?.map((ele) => (
          <div key={ele.id}>
            {ele.data.map((ele) => {
              return <p>{ele.color}</p>;
            })}
          </div>
        ))
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "2rem",
          marginTop: "2rem",
        }}
      ></div>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        {isFetched && isFetchingNextPage ? "Loading.." : "Show more"}
      </button>
    </div>
  );
};

export default Infinite;

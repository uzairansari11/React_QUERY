import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const DynamicParallelQuery = () => {
      const ids = [1, 2, 4];
      const fetcherFunction = (id) => {
            return axios.get(`http://localhost:8080/superheros/${id}`)
      }

      const res = useQueries(
            ids.map((id) => {
                  return {
                        queryKey: ['super-hero-parallel', id],
                        queryFn : ()=>fetcherFunction(id)
                  }
            })
      )
      // console.log(res[0].data.data.superhero, "from dynamic parallel queries");
  return <div>

        {
              res?.map((ele) => {
                    return ele.isLoading ? (
                      <p>Loading ....</p>
                    ) : ele.isError ? (
                      <p>{ele.error.message}</p>
                    ) : (
                      <div>
                        <p>{ele?.data?.data?.superhero}</p>
                      </div>
                    );
              })
        }

  </div>;
};

export default DynamicParallelQuery;
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
const fetchFunction = ({ queryKey }) => {
  // console.log(queryKey, "i am from hook");

  return axios.get(`http://localhost:8080/superheros/${queryKey[1]}`);
};

const useSuperhero = (userId, key) => {
  // console.log(key,"fom hook")
  const queryClient = useQueryClient();
  return useQuery(["super-hero", userId], fetchFunction, {
    initialData: () => {
      const res = queryClient
        .getQueryData(key)
        .data?.find((ele) => ele.id == parseInt(userId));
      console.log(res, "from hook");
      if (res) {
        console.log("data is present");
        return { data: res };
      } else {
        return undefined;
      }
    },
  });
};

export default useSuperhero;

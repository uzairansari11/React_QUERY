import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
const fetchFunction = ({ queryKey }) => {

  return axios.get(`http://localhost:8080/superheros/${queryKey[1]}`);
};

const useSuperhero = (userId, key) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", userId], fetchFunction, {
    initialData: () => {
      const res = queryClient
        .getQueryData(key)
        .data?.find((ele) => ele.id == parseInt(userId));
      if (res) {
        return { data: res };
      } else {
        return undefined;
      }
    },
  });
};

export default useSuperhero;

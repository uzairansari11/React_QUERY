import { useQuery } from "react-query";
import axios from "axios";
const fetchFunction = ({ queryKey }) => {
  // console.log(queryKey, "i am from hook");
  return axios.get(`http://localhost:8080/superheros/${queryKey[1]}`);
};

const useSuperhero = (userId) => {
  return useQuery(["super-hero", userId], fetchFunction);
};

export default useSuperhero;

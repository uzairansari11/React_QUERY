import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const adderFunction = (payload) => {
  return axios.post("http://localhost:8080/superheros", payload);
};
const useAddSuperhero = () => {
  const queryClient = useQueryClient();
  return useMutation(adderFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries("super-hero-data");
    },
  });
};

export default useAddSuperhero;

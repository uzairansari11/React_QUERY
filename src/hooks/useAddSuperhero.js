import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const adderFunction = (payload) => {
  return axios.post("http://localhost:8080/superheros", payload);
};
const useAddSuperhero = () => {
  const queryClient = useQueryClient();
  return useMutation(adderFunction, {
    /*   Invalidating Query */

    // onSuccess: () => {
    //   // queryClient.invalidateQueries("super-hero-data"); this cause an extra get request api so we can use another one ... when operation is success onSuccess has access to data | response

    // },

    /* Invalidate Query without make api and using response data  */

    // onSuccess: (data) => {

    //   queryClient.setQueryData("super-hero-data", (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, data.data],
    //     };
    //   });
    // }

    /* Optimistic Update  */

    /*  onMutate will run before mutate function which we are using to post the data  */
    onMutate: async (data) => {
      /* will have to stop any on going api call for this particular key  */
      await queryClient.cancelQueries("super-hero-data");
      const previousData = queryClient.getQueryData("super-hero-data");
      queryClient.setQueryData("super-hero-data", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data],
        };
      });
      return previousData;
    },
    onError: (error, data, context) => {
      queryClient.setQueryData("super-hero-data", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-her-data");
    },
  });
};

export default useAddSuperhero;

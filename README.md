### syntax

```
const resp = useQuery ('keyName' , fetch_function,
          {
        options | different config
            })
```

## Important points

- default cache time : 5 minutes,
- default stale time : 0 sec
- refetchOnMount : true | false | 'always'
- refetchOnWindowFocus: true | false | 'always'

## pooling

- refetchInterval : false by default take value in second,
- refetchIntervalInBackground : true this flag let data fetch even window loses the focus,

## fetch on click

- when a component mount react-query automatic
  fires the fetch function but what if we want
  it on a click event

- step 1  
  setting up {enabled : false}

- step 2
  useQuery give a function called 'refetch'
  which we can invoke onClick

## success | error callbacks

if you want to perform any side effect after success or error api call status you can pass onSuccess | onError key attaching with function which have access to data and error if we pass the argument

```
const onSuccess = (data)=>{
    // WE CAN PERFORM SIDE EFFECTS
    console.log(data)
}

const onError = (error)=>{
    console.log(error)
}

const res = useQuery(
    'key name',
    ()=>{
        return axios.get(url),
        {
            onSuccess,
            onError
        }
    }
)

```

### data transformation

- React query also provide a function called select using which we can transform our data
  success has access to our response

```
const onSuccess = (data)=>{
   // WE CAN PERFORM SIDE EFFECTS
   console.log(data)
}

const onError = (error)=>{
   console.log(error)
}

const res = useQuery(
   'key name',
   ()=>{
       return axios.get(url),
       {
           onSuccess,
           onError,
           success : (data)=>{
           const name = data.data.map((ele)=>{
            return ele.name
            })

           }
       }
   }
)
```

### Dynamic data fetching using id

#### keyPoints

- since react-query caches the data using keys so for dynamic id we need to use dynamic key : ['key-name',id] so every time we get different key for different id

- the fetch function has access to the {queryKey} which is an array so we can access
  the id using query[1]

```
const fetcherFunction = ( {queryKey})=>{
    console.log(queryKey)  // ['key-name',id]
    return axios.get(`url/${queryKey[1]}`)
}
const res = useQuery ( ['key-name',id],fetcherFunction)

```

### Dynamic parallel queries

- for ex : we go to a page where we want to fetch the data for two or more ids i:e [1,2,3]
  in this case we can make use of the hook given by react-query i:e useQueries

- example using code

```
import {useQueries} from "react-query";
import axios from "axios";
function DynamicPage = ({data}) =>{
  console.log(data) // [1,2,3]

const fetcherFunction = (id)=>{
  return axios.get(`${url}/${id}`)
}

  const res = useQueries (
   data.map((id)=>{
    return {
      queryKey:['key-name',id]
      queryFn : ()=>fetcherFunction(id)
    }
   })
  )

}

```

### Dependent Query

- important point
  when we use useQuery for data fetching as soon as component mounts
  api call is fired , so to stop it we have a flag called enabled by default
  its value is true

* let's take a example : we have a user email by which we can access his
  channel name , and using channel name we can access the content he
  makes on youtube; (all related to api calls)

```
const UserDetails = (data) =>{

const fetcherFunction1 = ({queryKey})=>{
return axios.get(`url1/${queryKey[1]}`)

}

const fetcherFunction2 = ({queryKey})=>{
return axios.get(`url2/${queryKey[1]}`)

}
  const {email} = data;

  const {data:user} =useQuery (
    ['user-details',email] , fetcherFunction
  )
const channelId = user.data.channelId
  const {data:channel} =useQuery (
    ['user-details',channelId] , fetcherFunction2,{
      enabled : !!channelId
    }
  )



}

```

### Initial Query Data

```
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

```

### Pagination and keepPreviousData

```
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
```

### Infinite Queries

- for ex: if you want show more button to be rendered and clicking on which more data should come then react-query provides a hook called useInfiniteQuery
  which has access to

  - hasNextPage
  - isFetching
  - isFetchingNextPage
  - fetchNextPage this is function which we can add on show more button

- example using code

```
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

```

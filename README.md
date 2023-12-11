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
  setting up {enable : false}

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




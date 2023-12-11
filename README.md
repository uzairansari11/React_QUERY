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

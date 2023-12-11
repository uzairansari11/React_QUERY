import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
const Superhero = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchDataFromAPI = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`http://localhost:8080/superheros`);
      const fetchedData = resp.data;
      // console.log("fetch data", fetchedData);
      setData(fetchedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <h3>Superhero List</h3>
      {loading ? (
        <p>..loading the data</p>
      ) : error ? (
        <p> {error}</p>
      ) : data?.length > 0 ? (
        data.map((ele) => (
          <p key={ele.id} className="App-hero">
            {ele.superhero}
          </p>
        ))
      ) : (
        <p>Oops! no data found</p>
      )}
    </div>
  );
};

export default Superhero;

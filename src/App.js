import { Link } from "react-router-dom";
import "./App.css";
import MainRouting from "./Routes/Routing";

function App() {
  const style = { textDecoration: "none", color: "white" };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4rem",
          background: "grey",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 2rem",
          textDecoration: "none",
          color: "red",
        }}
      >
        <Link to="/" style={style}>
          Home
        </Link>

        <Link to="/superheros" style={style}>
          Normal Fetching SuperHeros
        </Link>

        <Link to="req/superheros" style={style}>
          {" "}
          React Query Superheros
        </Link>
        <Link to="/req/superheros/dynamic/parallel" style={style}>
          {" "}
          Dynamic Parallel Superheros
        </Link>
        <Link to="/req/dependent/query/api/calls" style={style}>
          {" "}
          Dependent Query
        </Link>
        <Link to="/req/paginated/query/api/calls" style={style}>
          {" "}
          Paginated 
        </Link>
      </div>
      <MainRouting />
    </div>
  );
}

export default App;

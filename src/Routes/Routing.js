import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import RQFsuperhero from "../components/RQFsuperhero";
import Superhero from "../components/Superhero";
import RQFsuperherodetails from "../components/RQFsuperherodetails";
import DynamicParallelQuery from "../components/DynamicParallelQuery";
import DependentQuery from "../components/DependentQuery";
import Paginated from "../components/Paginated";
import Infinite from "../components/Infinite";

const MainRouting = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route path="/superheros" element={<Superhero />} />
      <Route path="/req/superheros" element={<RQFsuperhero />} />
      <Route path="/req/superheros/:id" element={<RQFsuperherodetails />} />
      <Route
        path="/req/superheros/dynamic/parallel"
        element={<DynamicParallelQuery />}
      />
      <Route
        path="/req/dependent/query/api/calls"
        element={<DependentQuery />}
      />
      <Route path="/req/paginated/query/api/calls" element={<Paginated />} />
      <Route path="/req/infinite/query/api/calls" element={<Infinite />} />
    </Routes>
  );
};

export default MainRouting;

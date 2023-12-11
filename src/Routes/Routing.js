import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import RQFsuperhero from "../components/RQFsuperhero";
import Superhero from "../components/Superhero";
import RQFsuperherodetails from "../components/RQFsuperherodetails";
import DynamicParallelQuery from "../components/DynamicParallelQuery";

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
    </Routes>
  );
};

export default MainRouting;

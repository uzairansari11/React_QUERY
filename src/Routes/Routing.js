import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import RQFsuperhero from "../components/RQFsuperhero";
import Superhero from "../components/Superhero";

const MainRouting = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route path="/superheros" element={<Superhero />} />
      <Route path="/req/superheros" element={<RQFsuperhero />} />
    </Routes>
  );
};

export default MainRouting;

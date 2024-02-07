import { Routes, Route } from "react-router-dom";
import { Home, Dashboard, Landing, Race, Auth, Narrator } from "../pages";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="/home" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/race" element={<Race />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/narrator" element={<Narrator/>}/>
    </Routes>
  );
};

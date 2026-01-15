import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./views/Home";
import Teams from "./views/Teams";
import Combat from "./views/Combat";
import { AppRoutes } from "./views/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.Home} element={<Home />} />
          <Route path={AppRoutes.Teams} element={<Teams />} />
          <Route path={AppRoutes.Combat} element={<Combat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center w-full h-full px-20 pt-10">
        <Outlet />
      </main>
    </>
  );
}

import { useContext } from "react";
import Home from "../pages/Home";
import AuthContext from "../context/AuthContext";
import Register from "../pages/Register";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Home></Home>;
  }
  return <Register></Register>;
};

export default MainLayout;

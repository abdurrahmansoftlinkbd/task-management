import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import Home from "../pages/Home";
// import PrivateRoute from "./PrivateRoute";
// import Register from "../pages/Register";
// import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // children: [
    //   {
    //     path: "/",
    //     element: (
    //       <PrivateRoute>
    //         <Home></Home>
    //       </PrivateRoute>
    //     ),
    //   },
    // ],
  },
]);

export default router;

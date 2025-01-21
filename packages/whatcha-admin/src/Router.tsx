import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashBoard from "@pages/DashBoard";
import Order from "@pages/Order";
import Member from "@pages/Member";
import Coupon from "@pages/Coupon";
import CarStock from "@pages/CarStock";
import Login from "@pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "member",
        element: <Member />,
      },
      {
        path: "coupon",
        element: <Coupon />,
      },
      {
        path: "stock",
        element: <CarStock />,
      },
    ],
  },
]);

export default router;
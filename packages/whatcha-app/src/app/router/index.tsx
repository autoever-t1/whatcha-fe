import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { MainPage } from "@pages/main";
import { SearchPage } from "@pages/search";
import { MyPage } from "@pages/mypage";
import { ListPage } from "@pages/list";
import { CarPage } from "@pages/car";
import { PayPage } from "@pages/pay";
import { OrderPage } from "@pages/order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/car/:carId",
        element: <CarPage />,
      },
      {
        path: "/pay/:carId",
        element: <PayPage />,
      },
      {
        path: "/order/:orderId",
        element: <OrderPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;

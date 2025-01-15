import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { MainPage } from "@pages/main";
import { SearchPage } from "@pages/search";
import { MyPage } from "@pages/mypage";
import { ListPage } from "@pages/list";
import { CarPage } from "@pages/car";
import { PayPage } from "@pages/pay";
import { OrderPage } from "@pages/order";
import { FavoritePage } from "@pages/favorite";
import { CouponPage } from "@pages/coupon";
import { OrderListPage } from "@pages/order-list";

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
      {
        path: "/mypage/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/mypage/coupon",
        element: <CouponPage />,
      },
      {
        path: "/mypage/orders",
        element: <OrderListPage />,
      },
    ],
  },
]);

export default router;

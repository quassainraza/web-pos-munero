import { RouteObject } from "react-router-dom";

import Orders from "../pages/Dashboard/Orders";
import Catalog from "../pages/Dashboard/Catalog";
import Login from "../pages/auth/login";

export const Routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
    ],
  },
];

export const AuthRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Login,
  },
];

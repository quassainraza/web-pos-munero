import { RouteObject } from "react-router-dom";
import Login from "../pages/auth/Login";
import Orders from "../pages/auth/Dashboard/Orders";
import Catalog from "../pages/auth/Dashboard/Catalog";

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

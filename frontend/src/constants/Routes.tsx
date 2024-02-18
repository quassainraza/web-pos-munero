import { RouteObject } from "react-router-dom";

import Catalog from "../pages/Dashboard/Catalog";
import Login from "../pages/auth/login";

export const Routes: RouteObject[] = [
  {
    path: "/catalog",
    element: <Catalog />,
  },
  // {
  //   path: "/orders",
  //   element: <Orders />,
  // },
];

export const AuthRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Login,
  },
];

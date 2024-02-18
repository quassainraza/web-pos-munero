import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthRoutes, Routes } from "../constants/Routes";

const authRouter = createHashRouter(AuthRoutes);
const appRouter = createHashRouter(Routes);
interface Props {
  isLoggedIn?: boolean;
}

export const AppRouter = ({ isLoggedIn }: Props) => {
  console.log("isloggedIn: ", isLoggedIn);
  console.log(Routes);
  return (
    <div>
      <RouterProvider router={isLoggedIn ? appRouter : authRouter} />
    </div>
  );
};

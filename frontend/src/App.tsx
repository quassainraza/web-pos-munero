import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalog from "./pages/Dashboard/Catalog";
import Orders from "./pages/Dashboard/Orders";
import Login from "./pages/auth/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expireDate");

    if (token && expirationDate) {
      const utcNow = moment.utc();
      const expirationUtc = moment.utc(expirationDate);

      if (utcNow.isBefore(expirationUtc)) {
        // Token is still valid
        setIsAuthenticated(true);
      } else {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("expireDate");
        setIsAuthenticated(false);
      }
    } else {
      // No token or expiration date found
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={isAuthenticated ? <Catalog /> : <Login />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <AppRouter isLoggedIn={isAuthenticated} />
  //   </div>
  // );
}

export default App;

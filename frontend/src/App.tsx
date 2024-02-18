import { useEffect, useState } from "react";
import "./App.css";
import { AppRouter } from "./routers/AppRouter";
import moment from "moment";

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
        localStorage.removeItem("expirationDate");
        setIsAuthenticated(false);
      }
    } else {
      // No token or expiration date found
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <AppRouter isLoggedIn={isAuthenticated} />
    </div>
  );
}

export default App;

import "./App.css";
import { AppRouter } from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter isLoggedIn={true} />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { AuthContextProvider } from "./Context/AuthContextProvider";
import RouteController from "./RouteController";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="wrapper">
      <AuthContextProvider>
        <RouteController />
      </AuthContextProvider>
    </div>
  );
}

export default App;

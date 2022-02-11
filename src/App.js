import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useToken from "./Services/useToken";

function App() {
  let { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

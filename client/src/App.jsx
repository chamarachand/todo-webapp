import Home from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import "./App.css";

export const AppContext = createContext();

function App() {
  const token = localStorage.getItem("token");

  return (
    <AppContext.Provider value={{ token }}>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

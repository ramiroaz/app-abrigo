import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Animais from "./pages/Animais";
import Especies from "./pages/Especies";
import Racas from "./pages/Racas";
import Funcionarios from "./pages/Funcionarios";
import Relatorios from "./pages/Relatorios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animais" element={<Animais />} />
            <Route path="/especies" element={<Especies />} />
            <Route path="/racas" element={<Racas />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;

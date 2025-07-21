import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Abrigo 🐾</h1>
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/animais">Animais</Link></li>
        <li><Link to="/especies">Espécies</Link></li>
        <li><Link to="/funcionarios">Funcionários</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

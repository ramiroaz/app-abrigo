import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaCat, FaUserMd, FaListAlt, FaPaw } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h2>Bem-vindo ao Sistema de Abrigo de Animais 🐾</h2>
      <p>Escolha uma das seções abaixo para começar:</p>

      <div className="card-grid">
        <Link to="/animais" className="card">
          <FaPaw size={40} />
          <h3>Animais</h3>
          <p>Gerencie os animais do abrigo</p>
        </Link>

        <Link to="/especies" className="card">
          <FaCat size={40} />
          <h3>Espécies</h3>
          <p>Visualize e cadastre espécies</p>
        </Link>

        <Link to="/racas" className="card">
          <FaDog size={40} />
          <h3>Raças</h3>
          <p>Gerencie raças por espécie</p>
        </Link>

        <Link to="/funcionarios" className="card">
          <FaUserMd size={40} />
          <h3>Funcionários</h3>
          <p>Equipe responsável pelo cuidado</p>
        </Link>

        <Link to="/relatorios" className="card">
          <FaListAlt size={40} />
          <h3>Relatórios</h3>
          <p>Filtre e consulte dados do abrigo</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;

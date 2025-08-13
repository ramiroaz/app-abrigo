import React, { useState } from "react";
import {
  listarPorEspecie,
  listarPorFuncionario,
  listarDisponiveis,
} from "../services/animalService";
import "./Relatorios.css";

function Relatorios() {
  const [resultado, setResultado] = useState([]);
  const [id, setId] = useState("");

  const buscarPorEspecie = () => {
    listarPorEspecie(id).then((res) => setResultado(res.data));
  };

  const buscarPorFuncionario = () => {
    listarPorFuncionario(id).then((res) => setResultado(res.data));
  };

  const buscarDisponiveis = () => {
    listarDisponiveis().then((res) => setResultado(res.data));
  };

  return (
    <div className="relatorios-container">
      {/* Lado esquerdo */}
      <div className="relatorios-esquerda">
        <h2>Relatórios</h2>

        <div className="input-area">
          <input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={buscarPorEspecie}>Por Espécie</button>
          <button onClick={buscarPorFuncionario}>Por Funcionário</button>
          <button onClick={buscarDisponiveis}>Disponíveis para Adoção</button>
        </div>

        <div className="tabela-container">
          <table className="tabela-animais">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Idade Estimada</th>
                <th>Data de Entrada</th>
                <th>Data de Adoção</th>
                <th>Data de Óbito</th>
                <th>Disponível para Adoção</th>
                <th>Funcionário Responsável</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nome}</td>
                  <td>{a.nomeEspecie || "-"}</td>
                  <td>{a.nomeRaca || "-"}</td>
                  <td>{a.idadeEstimada || "-"}</td>
                  <td>{a.dataEntrada || "-"}</td>
                  <td>{a.dataAdocao || "-"}</td>
                  <td>{a.dataObito || "-"}</td>
                  <td>{a.disponivelParaAdocao ? "Sim" : "Não"}</td>
                  <td>{a.nomeResponsavel || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lado direito */}
      <div className="relatorios-direita">
        {/* Conteúdo futuro será adicionado aqui */}
      </div>
    </div>
  );
}

export default Relatorios;

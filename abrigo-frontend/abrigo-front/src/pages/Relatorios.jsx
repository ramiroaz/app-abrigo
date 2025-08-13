import React, { useState, useEffect } from "react";
import {
  listarAnimais,
  listarPorEspecie,
  listarPorFuncionario,
  listarDisponiveis,
} from "../services/animalService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "./Relatorios.css";

const COLORS = ["#0088FE", "#FF8042"]; // Azul para cães, laranja para gatos

function Relatorios() {
  const [resultado, setResultado] = useState([]);
  const [id, setId] = useState("");

  // Carrega tudo ao iniciar
  useEffect(() => {
    listarAnimais().then((res) => setResultado(res.data));
  }, []);

  const buscarPorEspecie = () => {
    listarPorEspecie(id).then((res) => setResultado(res.data));
  };

  const buscarPorFuncionario = () => {
    listarPorFuncionario(id).then((res) => setResultado(res.data));
  };

  const buscarDisponiveis = () => {
    listarDisponiveis().then((res) => setResultado(res.data));
  };

  // Dados para o gráfico de pizza
  const specieCounts = resultado.reduce(
    (acc, a) => {
      if (a.nomeEspecie === "Canina") acc.dogs++;
      else if (a.nomeEspecie === "Felina") acc.cats++;
      return acc;
    },
    { dogs: 0, cats: 0 }
  );
  const pieData = [
    { name: "Cães", value: specieCounts.dogs },
    { name: "Gatos", value: specieCounts.cats },
  ];

  // Dados para o gráfico de barras (por funcionário)
  const barData = resultado.reduce((acc, a) => {
    const emp = a.nomeResponsavel || "—";
    let item = acc.find((i) => i.employee === emp);
    if (!item) {
      item = { employee: emp, dogs: 0, cats: 0 };
      acc.push(item);
    }
    if (a.nomeEspecie === "Canina") item.dogs++;
    else if (a.nomeEspecie === "Felina") item.cats++;
    return acc;
  }, []);

  // Dados para os cards
  const adoptedCount = resultado.filter((a) => a.dataAdocao).length;
  const availableCount = resultado.filter((a) => a.disponivelParaAdocao).length;

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
        {/* 1) Pizza */}
        <div className="relatorios-graficos">
          <div className="grafico-item">
            <h4>% Cães × Gatos</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <ReTooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 2) Barras por funcionário */}
          <div className="grafico-item">
            <h4>Cães × Gatos por Funcionário</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employee" />
                <YAxis allowDecimals={false} />
                <ReTooltip />
                <Legend />
                <Bar dataKey="dogs" name="Cães" fill={COLORS[0]} />
                <Bar dataKey="cats" name="Gatos" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3) Cards */}
        <div className="relatorios-cards">
          <div className="relatorio-card">
            <div className="numero">{adoptedCount}</div>
            <div className="label">Animais Adotados</div>
          </div>
          <div className="relatorio-card">
            <div className="numero">{availableCount}</div>
            <div className="label">Disponíveis para Adoção</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
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
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import "./Relatorios.css";

function Relatorios() {
  const [resultado, setResultado] = useState([]);
  const [id, setId] = useState("");

  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 6;
  const indiceInicial = (paginaAtual - 1) * registrosPorPagina;
  const indiceFinal = indiceInicial + registrosPorPagina;
  const registrosPaginados = resultado.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(resultado.length / registrosPorPagina);


  // Carrega todos ao montar
  useEffect(() => {
    listarAnimais().then((res) => setResultado(res.data));
  }, []);

  const buscarPorEspecie = () =>
    listarPorEspecie(id).then((res) => setResultado(res.data));
  const buscarPorFuncionario = () =>
    listarPorFuncionario(id).then((res) => setResultado(res.data));
  const buscarDisponiveis = () =>
    listarDisponiveis().then((res) => setResultado(res.data));

  // 1) dados do gráfico de pizza: agrupamento por nomeEspecie
  const speciesCounts = resultado.reduce((acc, a) => {
    const key = a.nomeEspecie || "Sem Espécie";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(speciesCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // lista de espécies para usar no bar chart
  const speciesList = pieData.map((d) => d.name);

  // 2) dados do gráfico de barras: um row por funcionário
  const barData = resultado.reduce((acc, a) => {
    const emp = a.nomeResponsavel || "Sem Responsável";
    let row = acc.find((r) => r.employee === emp);
    if (!row) {
      // inicializa counts com zero para cada espécie
      row = { employee: emp };
      speciesList.forEach((spec) => (row[spec] = 0));
      acc.push(row);
    }
    row[a.nomeEspecie] = (row[a.nomeEspecie] || 0) + 1;
    return acc;
  }, []);

  // 3) cards
  const adoptedCount = resultado.filter((a) => a.dataAdocao).length;
  const availableCount = resultado.filter((a) => a.disponivelParaAdocao).length;
  const obitoCount = resultado.filter((a) =>
                                a.dataObito && !isNaN(Date.parse(a.dataObito))
                              ).length;

  // cores para os slices/barras
  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA66CC"];

  return (
    <div className="relatorios-container">
      <div className="relatorios-esquerda">
        <h3>Registros de Animais</h3>
        <div className="filtros-container">
          <input
            type="text"
            placeholder="Informe o ID..."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={buscarPorEspecie}>Filtrar por Espécie</button>
          <button onClick={buscarPorFuncionario}>Filtrar por Funcionário</button>
          <button onClick={buscarDisponiveis}>Animais Disponíveis</button>
          <button onClick={() => listarAnimais().then((res) => setResultado(res.data))}>
            Limpar Filtros
          </button>
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
                <th>Disponível</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {registrosPaginados.map((a) => (
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
          <div className="paginacao">
            <span>Total: {resultado.length} registros</span>
            <button
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual(paginaAtual - 1)}
            >
              Anterior
            </button>
            <span>Página {paginaAtual} de {totalPaginas}</span>
            <button
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPaginaAtual(paginaAtual + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      <div className="relatorios-direita">
        <div className="relatorios-graficos">
          <div className="grafico-item">
            <h4>Distribuição por Espécie</h4>
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
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grafico-item">
            <h4>Animais por Funcionário</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employee" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {speciesList.map((spec, idx) => (
                  <Bar
                    key={spec}
                    dataKey={spec}
                    name={spec}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="relatorios-cards">
          <div className="relatorio-card card-adotados">
            <div className="numero">{adoptedCount}</div>
            <div className="label">Animais Adotados</div>
          </div>
          <div className="relatorio-card card-disponiveis">
            <div className="numero">{availableCount}</div>
            <div className="label">Disponíveis para Adoção</div>
          </div>
          <div className="relatorio-card card-obitos">
          <div className="numero">{obitoCount}</div>
          <div className="label">Óbitos Registrados</div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Relatorios;

import React, { useState } from "react";
import { listarPorEspecie, listarPorFuncionario, listarDisponiveis } from "../services/animalService";
import CardAnimal from "../components/CardAnimal";

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
    <div>
      <h2>Relatórios</h2>

      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={buscarPorEspecie}>Por Espécie</button>
      <button onClick={buscarPorFuncionario}>Por Funcionário</button>
      <button onClick={buscarDisponiveis}>Disponíveis para Adoção</button>

      <div className="lista">
        {resultado.map((a) => (
          <CardAnimal key={a.id} animal={a} />
        ))}
      </div>
    </div>
  );
}

export default Relatorios;
// This is the Relatorios component for the Abrigo de Animais application.
// It allows users to generate reports based on animal species, employees, or available animals for adoption.
// It uses the animalService to fetch data from the backend API and displays the results using CardAnimal components.
// The component maintains state for the search results and the input ID, and provides buttons to trigger the searches.
// The results are displayed in a list format, with each animal represented by a CardAnimal component.
// The component is designed to be user-friendly, allowing easy navigation through different reporting options.     

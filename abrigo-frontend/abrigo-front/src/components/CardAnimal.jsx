import React from "react";

function CardAnimal({ animal }) {
  return (
    <div className="card">
      <h3>{animal.nome}</h3>
      <p><strong>Raça:</strong> {animal.nomeRaca}</p>
      <p><strong>Espécie:</strong> {animal.nomeEspecie}</p>
      <p><strong>Responsável:</strong> {animal.nomeResponsavel}</p>
      <p>{animal.disponivelParaAdocao ? "Disponível para adoção" : "Indisponível"}</p>
    </div>
  );
}

export default CardAnimal;


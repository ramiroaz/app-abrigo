import React from "react";
import "./FormAnimal.css";

function FormConfirmarExclusaoEspecie({ especie, onConfirmar, onCancel }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h4>Confirmação</h4>
        <p>Tem certeza que deseja deletar a espécie <strong>{especie.nome}</strong>?</p>
        <div className="form-animal-buttons">
          <button className="btn vermelho" onClick={onConfirmar}>Confirmar</button>
          <button className="btn cancelar" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default FormConfirmarExclusaoEspecie;

import React from "react";
import "./FormAnimal.css";

function FormConfirmarExclusao({ animal, onConfirmar, onCancelar }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h4>Confirmação</h4>
        <p>Tem certeza que deseja deletar o animal <strong>{animal.nome}</strong>?</p>
        <div className="form-animal-buttons">
          <button className="btn vermelho" onClick={onConfirmar}>Confirmar</button>
          <button className="btn" onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default FormConfirmarExclusao;

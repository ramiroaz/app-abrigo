import React from "react";
import "./FormAnimal.css";

function FormEspecie({ especie, onChange, onSubmit, onCancel, titulo }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h3>{titulo}</h3>
        <form onSubmit={onSubmit}>
          <input name="id" value={especie.id} readOnly />
          <input
            name="nome"
            placeholder="Nome da espécie"
            value={especie.nome}
            onChange={onChange}
            required
          />
          <div className="form-animal-buttons">
            <button type="submit" className="btn salvar">Salvar</button>
            <button type="button" className="btn cancelar" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormEspecie;

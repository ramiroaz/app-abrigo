import React from "react";
import "./FormAnimal.css";

function FormRaca({ raca, especies, onChange, onSubmit, onCancel, titulo }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h3>{titulo}</h3>
        <form onSubmit={onSubmit}>
          <input name="id" value={raca.id} readOnly />
          <input
            name="nome"
            placeholder="Nome da raça"
            value={raca.nome}
            onChange={onChange}
            required
          />
          <select name="especieId" value={raca.especieId} onChange={onChange} required>
            <option value="">Selecione a espécie</option>
            {especies.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
          <div className="form-animal-buttons">
            <button type="submit" className="btn salvar">Salvar</button>
            <button type="button" className="btn cancelar" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRaca;

import React from "react";
import "./FormAnimal.css";

function FormFuncionario({ funcionario, onChange, onSubmit, onCancel, titulo }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h3>{titulo}</h3>
        <form onSubmit={onSubmit}>
          <input name="id" value={funcionario.id} readOnly />
          <input
            name="nome"
            placeholder="Nome"
            value={funcionario.nome}
            onChange={onChange}
            required
          />
          <input
            name="funcao"
            placeholder="Função"
            value={funcionario.funcao}
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

export default FormFuncionario;

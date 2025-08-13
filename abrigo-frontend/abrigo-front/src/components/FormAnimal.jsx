import React from "react";
import "./FormAnimal.css";

function FormAnimal({ animal, racas, funcionarios, onChange, onSubmit, onCancel, titulo }) {
  return (
    <div className="form-animal-overlay">
      <div className="form-animal-container">
        <h3>{titulo}</h3>
        <form onSubmit={onSubmit}>
          <input name="id" value={animal.id} readOnly />
          <input name="nome" placeholder="Nome" value={animal.nome} onChange={onChange} required />
          <input name="caracteristicas" placeholder="Características" value={animal.caracteristicas} onChange={onChange} />
          <input name="doencas" placeholder="Doenças" value={animal.doencas} onChange={onChange} />
          <input name="tratamentos" placeholder="Tratamentos" value={animal.tratamentos} onChange={onChange} />

          <label>
            <input type="checkbox" name="disponivelParaAdocao" checked={animal.disponivelParaAdocao} onChange={onChange} />
            Disponível para adoção
          </label>

          <label>Data de nascimento estimada:</label>
          <input type="date" name="dataNascimentoEstimada" value={animal.dataNascimentoEstimada || ""} onChange={onChange} required />

          <label>Data de entrada:</label>
          <input type="date" name="dataEntrada" value={animal.dataEntrada || ""} onChange={onChange} required />

          <label>Data de adoção:</label>
          <input type="date" name="dataAdocao" value={animal.dataAdocao || ""} onChange={onChange} />

          <label>Data de óbito:</label>
          <input type="date" name="dataObito" value={animal.dataObito || ""} onChange={onChange} />

          <label>Idade estimada:</label>
          <input type="text" name="idadeEstimada" value={animal.idadeEstimada || ""} readOnly />

          <select name="racaId" value={animal.racaId} onChange={onChange} required>
            <option value="">Selecione a raça</option>
            {racas.map((r) => <option key={r.id} value={r.id}>{r.nome}</option>)}
          </select>

          <select name="funcionarioId" value={animal.funcionarioId} onChange={onChange} required>
            <option value="">Selecione o funcionário</option>
            {funcionarios.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
          </select>

          <div className="form-animal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAnimal;

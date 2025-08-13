import React, { useEffect, useState } from "react";
import {
  listarAnimais,
  salvarAnimal,
  excluirAnimal,
} from "../services/animalService";
import axios from "axios";
import { toast } from "react-toastify";

function Animais_old() {
  const [animais, setAnimais] = useState([]);
  const [racas, setRacas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [novoAnimal, setNovoAnimal] = useState({
    id: "",
    nome: "",
    caracteristicas: "",
    doencas: "",
    tratamentos: "",
    disponivelParaAdocao: true,
    racaId: "",
    funcionarioId: "",
  });
  const [animalEditando, setAnimalEditando] = useState(null);
  const [animalParaExcluir, setAnimalParaExcluir] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resAnimais, resRacas, resFuncionarios] = await Promise.all([
        listarAnimais(),
        axios.get("http://localhost:8080/racas"),
        axios.get("http://localhost:8080/funcionarios"),
      ]);
      setAnimais(resAnimais.data);
      setRacas(resRacas.data);
      setFuncionarios(resFuncionarios.data);
      const proximoId = Math.max(...resAnimais.data.map(a => a.id), 0) + 1;
      setNovoAnimal((prev) => ({ ...prev, id: proximoId }));
    } catch {
      toast.error("Erro ao carregar dados.");
    }
  };

  const handleChange = (e, setState) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setState((prev) => ({ ...prev, [name]: val }));
  };

  const salvar = (animal, fechar) => {
    salvarAnimal(animal)
      .then(() => {
        toast.success("Animal salvo!");
        fechar();
        carregarDados();
      })
      .catch(() => toast.error("Erro ao salvar animal."));
  };

  const confirmarEdicao = () => {
    const original = animais.find((a) => a.id === animalEditando.id);
    if (JSON.stringify(original) === JSON.stringify(animalEditando)) {
      toast.info("Nenhuma alteração detectada.");
      return;
    }
    salvar(animalEditando, () => setModalEdicao(false));
  };

  const solicitarExclusao = (animal) => {
    setAnimalParaExcluir(animal);
    setModalConfirmacao(true);
  };

  const excluir = () => {
    excluirAnimal(animalParaExcluir.id)
      .then(() => {
        toast.success("Animal excluído.");
        setModalConfirmacao(false);
        setAnimalParaExcluir(null);
        carregarDados();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error(`Não é possível deletar o animal "${animalParaExcluir.nome}" pois está vinculado a um ou mais registros.`);
        } else {
          toast.error("Erro ao excluir animal.");
        }
        setModalConfirmacao(false);
        setAnimalParaExcluir(null);
      });
  };

    return (
    <div>
      <h2>Animais</h2>
      <button className="btn verde" onClick={() => setModalAberto(true)}>
        Criar novo animal
      </button>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Espécie</th>
            <th>Responsável</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nome}</td>
              <td>{a.nomeRaca}</td>
              <td>{a.nomeEspecie}</td>
              <td>{a.nomeResponsavel}</td>
              <td>{a.disponivelParaAdocao ? "Sim" : "Não"}</td>
              <td>
                <button className="btn azul" onClick={() => { setAnimalEditando({ ...a }); setModalEdicao(true); }}>
                  Editar
                </button>
                <button className="btn vermelho" onClick={() => solicitarExclusao(a)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && (
        <>
          <div className="modal-overlay" onClick={() => setModalAberto(false)} />
          <div className="modal">
            <h3>Novo Animal</h3>
            <form onSubmit={(e) => { e.preventDefault(); salvar(novoAnimal, () => setModalAberto(false)); }}>
              <input name="id" value={novoAnimal.id} readOnly />
              <input name="nome" placeholder="Nome" value={novoAnimal.nome} onChange={(e) => handleChange(e, setNovoAnimal)} required />
              <input name="caracteristicas" placeholder="Características" value={novoAnimal.caracteristicas} onChange={(e) => handleChange(e, setNovoAnimal)} />
              <input name="doencas" placeholder="Doenças" value={novoAnimal.doencas} onChange={(e) => handleChange(e, setNovoAnimal)} />
              <input name="tratamentos" placeholder="Tratamentos" value={novoAnimal.tratamentos} onChange={(e) => handleChange(e, setNovoAnimal)} />
              <label>
                <input type="checkbox" name="disponivelParaAdocao" checked={novoAnimal.disponivelParaAdocao} onChange={(e) => handleChange(e, setNovoAnimal)} />
                Disponível para adoção
              </label>
              <select name="racaId" value={novoAnimal.racaId} onChange={(e) => handleChange(e, setNovoAnimal)} required>
                <option value="">Selecione a raça</option>
                {racas.map((r) => <option key={r.id} value={r.id}>{r.nome}</option>)}
              </select>
              <select name="funcionarioId" value={novoAnimal.funcionarioId} onChange={(e) => handleChange(e, setNovoAnimal)} required>
                <option value="">Selecione o funcionário</option>
                {funcionarios.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
              </select>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {modalEdicao && animalEditando && (
        <>
          <div className="modal-overlay" onClick={() => setModalEdicao(false)} />
          <div className="modal">
            <h3>Editar Animal</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmarEdicao(); }}>
              <input name="id" value={animalEditando.id} readOnly />
              <input name="nome" value={animalEditando.nome} onChange={(e) => handleChange(e, setAnimalEditando)} required />
              <input name="caracteristicas" value={animalEditando.caracteristicas} onChange={(e) => handleChange(e, setAnimalEditando)} />
              <input name="doencas" value={animalEditando.doencas} onChange={(e) => handleChange(e, setAnimalEditando)} />
              <input name="tratamentos" value={animalEditando.tratamentos} onChange={(e) => handleChange(e, setAnimalEditando)} />
              <label>
                <input
                  type="checkbox"
                  name="disponivelParaAdocao"
                  checked={animalEditando.disponivelParaAdocao}
                  onChange={(e) => handleChange(e, setAnimalEditando)}
                />
                Disponível para adoção
              </label>
              <select name="racaId" value={animalEditando.racaId} onChange={(e) => handleChange(e, setAnimalEditando)} required>
                <option value="">Selecione a raça</option>
                {racas.map((r) => (
                  <option key={r.id} value={r.id}>{r.nome}</option>
                ))}
              </select>
              <select name="funcionarioId" value={animalEditando.funcionarioId} onChange={(e) => handleChange(e, setAnimalEditando)} required>
                <option value="">Selecione o funcionário</option>
                {funcionarios.map((f) => (
                  <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
              </select>
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setModalEdicao(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {modalConfirmacao && animalParaExcluir && (
        <>
          <div className="modal-overlay" onClick={() => setModalConfirmacao(false)} />
          <div className="modal">
            <h4>Confirmação</h4>
            <p>Tem certeza que deseja deletar o animal <strong>{animalParaExcluir.nome}</strong>?</p>
            <button className="btn vermelho" onClick={excluir}>Confirmar</button>
            <button className="btn" onClick={() => setModalConfirmacao(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Animais_old;

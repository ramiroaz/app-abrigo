import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Racas() {
  const [racas, setRacas] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [novaRaca, setNovaRaca] = useState({ id: "", nome: "", especieId: "" });
  const [racaEditando, setRacaEditando] = useState(null);
  const [racaParaExcluir, setRacaParaExcluir] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resRacas, resEspecies] = await Promise.all([
        axios.get("http://localhost:8080/racas"),
        axios.get("http://localhost:8080/especies"),
      ]);
      setRacas(resRacas.data);
      setEspecies(resEspecies.data);
      const proximoId = Math.max(...resRacas.data.map(r => r.id), 0) + 1;
      setNovaRaca({ id: proximoId, nome: "", especieId: "" });
    } catch {
      toast.error("Erro ao carregar dados.");
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = (raca, fechar) => {
    axios.post("http://localhost:8080/racas", raca)
      .then(() => {
        toast.success("Raça salva!");
        fechar();
        carregarDados();
      })
      .catch(() => toast.error("Erro ao salvar raça."));
  };

  const confirmarEdicao = () => {
    const original = racas.find((r) => r.id === racaEditando.id);
    if (JSON.stringify(original) === JSON.stringify(racaEditando)) {
      toast.info("Nenhuma alteração detectada.");
      return;
    }
    salvar(racaEditando, () => setModalEdicao(false));
  };

  const solicitarExclusao = (raca) => {
    setRacaParaExcluir(raca);
    setModalConfirmacao(true);
  };

  const excluir = () => {
    axios.delete(`http://localhost:8080/racas/${racaParaExcluir.id}`)
      .then(() => {
        toast.success("Raça excluída.");
        setModalConfirmacao(false);
        setRacaParaExcluir(null);
        carregarDados();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error(`Não é possível deletar a raça "${racaParaExcluir.nome}" pois está vinculada a um ou mais registros.`);
        } else {
          toast.error("Erro ao excluir raça.");
        }
        setModalConfirmacao(false);
        setRacaParaExcluir(null);
      });
  };

  return (
    <div>
      <h2>Raças</h2>
      <button className="btn verde" onClick={() => setModalAberto(true)}>Criar nova raça</button>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {racas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.nome}</td>
              <td>{r.nomeEspecie}</td>
              <td>
                <button className="btn azul" onClick={() => { setRacaEditando({ ...r }); setModalEdicao(true); }}>Editar</button>
                <button className="btn vermelho" onClick={() => solicitarExclusao(r)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de cadastro */}
      {modalAberto && (
        <>
          <div className="modal-overlay" onClick={() => setModalAberto(false)} />
          <div className="modal">
            <h3>Nova Raça</h3>
            <form onSubmit={(e) => { e.preventDefault(); salvar(novaRaca, () => setModalAberto(false)); }}>
              <input name="id" value={novaRaca.id} readOnly />
              <input name="nome" placeholder="Nome" value={novaRaca.nome} onChange={(e) => handleChange(e, setNovaRaca)} required />
              <select name="especieId" value={novaRaca.especieId} onChange={(e) => handleChange(e, setNovaRaca)} required>
                <option value="">Selecione a espécie</option>
                {especies.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
              </select>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de edição */}
      {modalEdicao && racaEditando && (
        <>
          <div className="modal-overlay" onClick={() => setModalEdicao(false)} />
          <div className="modal">
            <h3>Editar Raça</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmarEdicao(); }}>
              <input name="id" value={racaEditando.id} readOnly />
              <input name="nome" value={racaEditando.nome} onChange={(e) => handleChange(e, setRacaEditando)} required />
              <select name="especieId" value={racaEditando.especieId} onChange={(e) => handleChange(e, setRacaEditando)} required>
                <option value="">Selecione a espécie</option>
                {especies.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
              </select>
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setModalEdicao(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de confirmação de exclusão */}
      {modalConfirmacao && racaParaExcluir && (
        <>
          <div className="modal-overlay" onClick={() => setModalConfirmacao(false)} />
          <div className="modal">
            <h4>Confirmação</h4>
            <p>Tem certeza que deseja deletar a raça <strong>{racaParaExcluir.nome}</strong>?</p>
            <button className="btn vermelho" onClick={excluir}>Confirmar</button>
            <button className="btn" onClick={() => setModalConfirmacao(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Racas;

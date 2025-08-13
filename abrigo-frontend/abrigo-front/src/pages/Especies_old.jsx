import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Especies() {
  const [especies, setEspecies] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [novaEspecie, setNovaEspecie] = useState({ id: "", nome: "" });
  const [especieEditando, setEspecieEditando] = useState(null);
  const [especieParaExcluir, setEspecieParaExcluir] = useState(null);

  useEffect(() => {
    carregarEspecies();
  }, []);

  const carregarEspecies = async () => {
    try {
      const res = await axios.get("http://localhost:8080/especies");
      setEspecies(res.data);
      const proximoId = Math.max(...res.data.map(e => e.id), 0) + 1;
      setNovaEspecie({ id: proximoId, nome: "" });
    } catch {
      toast.error("Erro ao carregar espécies.");
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = (especie, fechar) => {
    axios.post("http://localhost:8080/especies", especie)
      .then(() => {
        toast.success("Espécie salva!");
        fechar();
        carregarEspecies();
      })
      .catch(() => toast.error("Erro ao salvar espécie."));
  };

  const confirmarEdicao = () => {
    const original = especies.find((e) => e.id === especieEditando.id);
    if (JSON.stringify(original) === JSON.stringify(especieEditando)) {
      toast.info("Nenhuma alteração detectada.");
      return;
    }
    salvar(especieEditando, () => setModalEdicao(false));
  };

  const solicitarExclusao = (especie) => {
    setEspecieParaExcluir(especie);
    setModalConfirmacao(true);
  };

  const excluir = () => {
    axios.delete(`http://localhost:8080/especies/${especieParaExcluir.id}`)
      .then(() => {
        toast.success("Espécie excluída.");
        setModalConfirmacao(false);
        setEspecieParaExcluir(null);
        carregarEspecies();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error(`Não é possível deletar a espécie "${especieParaExcluir.nome}" pois está vinculada a um ou mais registros.`);
        } else {
          toast.error("Erro ao excluir espécie.");
        }
        setModalConfirmacao(false);
        setEspecieParaExcluir(null);
      });
  };

  return (
    <div>
      <h2>Espécies</h2>
      <button className="btn verde" onClick={() => setModalAberto(true)}>Criar nova espécie</button>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {especies.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.nome}</td>
              <td>
                <button className="btn azul" onClick={() => { setEspecieEditando({ ...e }); setModalEdicao(true); }}>Editar</button>
                <button className="btn vermelho" onClick={() => solicitarExclusao(e)}>Excluir</button>
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
            <h3>Nova Espécie</h3>
            <form onSubmit={(e) => { e.preventDefault(); salvar(novaEspecie, () => setModalAberto(false)); }}>
              <input name="id" value={novaEspecie.id} readOnly />
              <input name="nome" placeholder="Nome" value={novaEspecie.nome} onChange={(e) => handleChange(e, setNovaEspecie)} required />
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de edição */}
      {modalEdicao && especieEditando && (
        <>
          <div className="modal-overlay" onClick={() => setModalEdicao(false)} />
          <div className="modal">
            <h3>Editar Espécie</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmarEdicao(); }}>
              <input name="id" value={especieEditando.id} readOnly />
              <input name="nome" value={especieEditando.nome} onChange={(e) => handleChange(e, setEspecieEditando)} required />
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setModalEdicao(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de confirmação */}
      {modalConfirmacao && especieParaExcluir && (
        <>
          <div className="modal-overlay" onClick={() => setModalConfirmacao(false)} />
          <div className="modal">
            <h4>Confirmação</h4>
            <p>Tem certeza que deseja deletar a espécie <strong>{especieParaExcluir.nome}</strong>?</p>
            <button className="btn vermelho" onClick={excluir}>Confirmar</button>
            <button className="btn" onClick={() => setModalConfirmacao(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Especies;

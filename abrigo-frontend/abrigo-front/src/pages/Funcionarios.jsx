import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [novoFuncionario, setNovoFuncionario] = useState({ id: "", nome: "", funcao: "" });
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/funcionarios");
      setFuncionarios(res.data);
      const proximoId = Math.max(...res.data.map(f => f.id), 0) + 1;
      setNovoFuncionario({ id: proximoId, nome: "", funcao: "" });
    } catch {
      toast.error("Erro ao carregar funcionários.");
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = (funcionario, fechar) => {
    axios.post("http://localhost:8080/funcionarios", funcionario)
      .then(() => {
        toast.success("Funcionário salvo!");
        fechar();
        carregarFuncionarios();
      })
      .catch(() => toast.error("Erro ao salvar funcionário."));
  };

  const confirmarEdicao = () => {
    const original = funcionarios.find((f) => f.id === funcionarioEditando.id);
    if (JSON.stringify(original) === JSON.stringify(funcionarioEditando)) {
      toast.info("Nenhuma alteração detectada.");
      return;
    }
    salvar(funcionarioEditando, () => setModalEdicao(false));
  };

  const solicitarExclusao = (funcionario) => {
    setFuncionarioParaExcluir(funcionario);
    setModalConfirmacao(true);
  };

  const excluir = () => {
    axios.delete(`http://localhost:8080/funcionarios/${funcionarioParaExcluir.id}`)
    .then(() => {
      toast.success("Funcionário excluído.");
      setModalConfirmacao(false);
      setFuncionarioParaExcluir(null);
      carregarFuncionarios();
    })
    .catch((err) => {
      const status = err?.response?.status;
      const mensagem = err?.response?.data;

      // erro http 409 (conflito) geralmente indica que o funcionário está vinculado a outras entidades
      // e não pode ser excluído. Mostra a mensagem de erro do backend se disponível
      if (status === 409 && typeof mensagem === "string") {
        toast.error(mensagem); // mostra exatamente o que veio do backend
      } else {
        toast.error("Erro ao excluir funcionário.");
      }

      setModalConfirmacao(false);
      setFuncionarioParaExcluir(null);
    });

  };



  return (
    <div>
      <h2>Funcionários</h2>
      <button className="btn verde" onClick={() => setModalAberto(true)}>Criar novo funcionário</button>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.nome}</td>
              <td>{f.funcao}</td>
              <td>
                <button className="btn azul" onClick={() => { setFuncionarioEditando({ ...f }); setModalEdicao(true); }}>Editar</button>
                <button className="btn vermelho" onClick={() => solicitarExclusao(f)}>Excluir</button>
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
            <h3>Novo Funcionário</h3>
            <form onSubmit={(e) => { e.preventDefault(); salvar(novoFuncionario, () => setModalAberto(false)); }}>
              <input name="id" value={novoFuncionario.id} readOnly />
              <input name="nome" placeholder="Nome" value={novoFuncionario.nome} onChange={(e) => handleChange(e, setNovoFuncionario)} required />
              <input name="funcao" placeholder="Função" value={novoFuncionario.funcao} onChange={(e) => handleChange(e, setNovoFuncionario)} required />
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de edição */}
      {modalEdicao && funcionarioEditando && (
        <>
          <div className="modal-overlay" onClick={() => setModalEdicao(false)} />
          <div className="modal">
            <h3>Editar Funcionário</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmarEdicao(); }}>
              <input name="id" value={funcionarioEditando.id} readOnly />
              <input name="nome" value={funcionarioEditando.nome} onChange={(e) => handleChange(e, setFuncionarioEditando)} required />
              <input name="funcao" value={funcionarioEditando.funcao} onChange={(e) => handleChange(e, setFuncionarioEditando)} required />
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setModalEdicao(false)}>Cancelar</button>
            </form>
          </div>
        </>
      )}

      {/* Modal de confirmação */}
      {modalConfirmacao && funcionarioParaExcluir && (
        <>
          <div className="modal-overlay" onClick={() => setModalConfirmacao(false)} />
          <div className="modal">
            <h4>Confirmação</h4>
            <p>Tem certeza que deseja deletar o funcionário <strong>{funcionarioParaExcluir.nome}</strong>?</p>
            <button className="btn vermelho" onClick={excluir}>Confirmar</button>
            <button className="btn" onClick={() => setModalConfirmacao(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Funcionarios;

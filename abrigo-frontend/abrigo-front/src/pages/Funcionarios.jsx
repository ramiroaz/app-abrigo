import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormFuncionario from '../components/FormFuncionario';
import FormConfirmarExclusaoFuncionario from '../components/FormConfirmarExclusaoFuncionario';
import '../components/FormAnimal.css';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [modo, setModo] = useState(null); // 'cadastro', 'edicao', 'exclusao'
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const res = await axios.get('http://localhost:8080/funcionarios');
      setFuncionarios(res.data);
    } catch {
      toast.error('Erro ao carregar funcionários.');
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvarFuncionario = async (dados) => {
    try {
      if (modo === 'cadastro') {
        await axios.post('http://localhost:8080/funcionarios', dados);
        toast.success('Funcionário cadastrado com sucesso!');
      } else if (modo === 'edicao') {
        await axios.put(`http://localhost:8080/funcionarios/${dados.id}`, dados);
        toast.success('Funcionário atualizado com sucesso!');
      }
      setModo(null);
      setFuncionarioSelecionado(null);
      carregarFuncionarios();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao salvar funcionário.';
      toast.error(mensagem);
    }
  };

  const excluirFuncionario = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/funcionarios/${id}`);
      toast.success('Funcionário excluído com sucesso!');
      setModo(null);
      setFuncionarioSelecionado(null);
      carregarFuncionarios();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao excluir funcionário.';
      toast.error(mensagem);
      setModo(null);
      setFuncionarioSelecionado(null);
    }
  };

  return (
    <div>
      <h1>Funcionários</h1>
      <button className="btn verde" onClick={() => {
        const novo = { id: '', nome: '', funcao: '' };
        setFuncionarioSelecionado(novo);
        setModo('cadastro');
      }}>
        Novo Funcionário
      </button>

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
                <button className="btn azul" onClick={() => {
                  setFuncionarioSelecionado({ ...f });
                  setModo('edicao');
                }}>
                  Editar
                </button>
                <button className="btn vermelho" onClick={() => {
                  setFuncionarioSelecionado(f);
                  setModo('exclusao');
                }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(modo === 'cadastro' || modo === 'edicao') && funcionarioSelecionado && (
        <FormFuncionario
          titulo={modo === 'cadastro' ? 'Novo Funcionário' : 'Editar Funcionário'}
          funcionario={funcionarioSelecionado}
          onChange={(e) => handleChange(e, setFuncionarioSelecionado)}
          onSubmit={(e) => {
            e.preventDefault();
            salvarFuncionario(funcionarioSelecionado);
          }}
          onCancel={() => setModo(null)}
        />
      )}

      {modo === 'exclusao' && funcionarioSelecionado && (
        <FormConfirmarExclusaoFuncionario
          funcionario={funcionarioSelecionado}
          onConfirmar={() => excluirFuncionario(funcionarioSelecionado.id)}
          onCancel={() => setModo(null)}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormEspecie from '../components/FormEspecie';
import FormConfirmarExclusaoEspecie from '../components/FormConfirmarExclusaoEspecie';
import '../components/FormAnimal.css';

export default function Especies() {
  const [especies, setEspecies] = useState([]);
  const [modo, setModo] = useState(null);
  const [especieSelecionada, setEspecieSelecionada] = useState(null);

  useEffect(() => {
    carregarEspecies();
  }, []);

  const carregarEspecies = async () => {
    try {
      const res = await axios.get('http://localhost:8080/especies');
      setEspecies(res.data);
    } catch {
      toast.error('Erro ao carregar espécies.');
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvarEspecie = async (dados) => {
    try {
      if (modo === 'cadastro') {
        await axios.post('http://localhost:8080/especies', dados);
        toast.success('Espécie cadastrada com sucesso!');
      } else if (modo === 'edicao') {
        await axios.put(`http://localhost:8080/especies/${dados.id}`, dados);
        toast.success('Espécie atualizada com sucesso!');
      }
      setModo(null);
      setEspecieSelecionada(null);
      carregarEspecies();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao salvar espécie.';
      toast.error(mensagem);
    }
  };

  const excluirEspecie = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/especies/${id}`);
      toast.success('Espécie excluída com sucesso!');
      setModo(null);
      setEspecieSelecionada(null);
      carregarEspecies();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao excluir espécie.';
      toast.error(mensagem);
      setModo(null);
      setEspecieSelecionada(null);
    }
  };

  return (
    <div>
      <h1>Espécies</h1>
      <button className="btn verde" onClick={() => {
        const nova = { id: '', nome: '' };
        setEspecieSelecionada(nova);
        setModo('cadastro');
      }}>
        Nova Espécie
      </button>

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
                <button className="btn azul" onClick={() => {
                  setEspecieSelecionada({ ...e });
                  setModo('edicao');
                }}>
                  Editar
                </button>
                <button className="btn vermelho" onClick={() => {
                  setEspecieSelecionada(e);
                  setModo('exclusao');
                }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(modo === 'cadastro' || modo === 'edicao') && especieSelecionada && (
        <FormEspecie
          titulo={modo === 'cadastro' ? 'Nova Espécie' : 'Editar Espécie'}
          especie={especieSelecionada}
          onChange={(e) => handleChange(e, setEspecieSelecionada)}
          onSubmit={(e) => {
            e.preventDefault();
            salvarEspecie(especieSelecionada);
          }}
          onCancel={() => setModo(null)}
        />
      )}

      {modo === 'exclusao' && especieSelecionada && (
        <FormConfirmarExclusaoEspecie
          especie={especieSelecionada}
          onConfirmar={() => excluirEspecie(especieSelecionada.id)}
          onCancel={() => setModo(null)}
        />
      )}
    </div>
  );
}

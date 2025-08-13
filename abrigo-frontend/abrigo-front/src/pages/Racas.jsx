import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormRaca from '../components/FormRaca';
import FormConfirmarExclusaoRaca from '../components/FormConfirmarExclusaoRaca';
import '../components/FormAnimal.css';

export default function Racas() {
  const [racas, setRacas] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [modo, setModo] = useState(null); // 'cadastro', 'edicao', 'exclusao'
  const [racaSelecionada, setRacaSelecionada] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resRacas, resEspecies] = await Promise.all([
        axios.get('http://localhost:8080/racas'),
        axios.get('http://localhost:8080/especies'),
      ]);
      setRacas(resRacas.data);
      setEspecies(resEspecies.data);
    } catch {
      toast.error('Erro ao carregar raças ou espécies.');
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const salvarRaca = async (dados) => {
    try {
      if (modo === 'cadastro') {
        await axios.post('http://localhost:8080/racas', dados);
        toast.success('Raça cadastrada com sucesso!');
      } else if (modo === 'edicao') {
        await axios.put(`http://localhost:8080/racas/${dados.id}`, dados);
        toast.success('Raça atualizada com sucesso!');
      }
      setModo(null);
      setRacaSelecionada(null);
      carregarDados();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao salvar raça.';
      toast.error(mensagem);
    }
  };

  const excluirRaca = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/racas/${id}`);
      toast.success('Raça excluída com sucesso!');
      setModo(null);
      setRacaSelecionada(null);
      carregarDados();
    } catch (error) {
      const mensagem = error.response?.data || 'Erro ao excluir raça.';
      toast.error(mensagem);
      setModo(null);
      setRacaSelecionada(null);
    }
  };

  return (
    <div>
      <h1>Raças</h1>
      <button className="btn verde" onClick={() => {
        const nova = { id: '', nome: '', especieId: '' };
        setRacaSelecionada(nova);
        setModo('cadastro');
      }}>
        Nova Raça
      </button>

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
              <td>{especies.find(e => e.id === r.especieId)?.nome || '—'}</td>
              <td>
                <button className="btn azul" onClick={() => {
                  setRacaSelecionada({ ...r });
                  setModo('edicao');
                }}>
                  Editar
                </button>
                <button className="btn vermelho" onClick={() => {
                  setRacaSelecionada(r);
                  setModo('exclusao');
                }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(modo === 'cadastro' || modo === 'edicao') && racaSelecionada && (
        <FormRaca
          titulo={modo === 'cadastro' ? 'Nova Raça' : 'Editar Raça'}
          raca={racaSelecionada}
          especies={especies}
          onChange={(e) => handleChange(e, setRacaSelecionada)}
          onSubmit={(e) => {
            e.preventDefault();
            salvarRaca(racaSelecionada);
          }}
          onCancel={() => setModo(null)}
        />
      )}

      {modo === 'exclusao' && racaSelecionada && (
        <FormConfirmarExclusaoRaca
          raca={racaSelecionada}
          onConfirmar={() => excluirRaca(racaSelecionada.id)}
          onCancel={() => setModo(null)}
        />
      )}
    </div>
  );
}

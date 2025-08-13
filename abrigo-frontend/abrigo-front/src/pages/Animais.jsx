import React, { useEffect, useState } from "react";
import {
  listarAnimais,
  salvarAnimal,
  excluirAnimal,
} from "../services/animalService";
import axios from "axios";
import { toast } from "react-toastify";
import FormAnimal from "../components/FormAnimal";
import FormConfirmarExclusao from "../components/FormConfirmarExclusao";

function Animais() {
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
    dataNascimentoEstimada: "",
    dataEntrada: "",
    dataAdocao: "",
    dataObito: "",
    idadeEstimada: "",
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
                <button
                  className="btn azul"
                  onClick={() => {
                    setAnimalEditando({ ...a });
                    setModalEdicao(true);
                  }}
                >
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
        <FormAnimal
          titulo="Novo Animal"
          animal={novoAnimal}
          racas={racas}
          funcionarios={funcionarios}
          onChange={(e) => handleChange(e, setNovoAnimal)}
          onSubmit={(e) => {
            e.preventDefault();
            salvar(novoAnimal, () => setModalAberto(false));
          }}
          onCancel={() => setModalAberto(false)}
        />
      )}

      {modalEdicao && animalEditando && (
        <FormAnimal
          titulo="Editar Animal"
          animal={animalEditando}
          racas={racas}
          funcionarios={funcionarios}
          onChange={(e) => handleChange(e, setAnimalEditando)}
          onSubmit={(e) => {
            e.preventDefault();
            confirmarEdicao();
          }}
          onCancel={() => setModalEdicao(false)}
        />
      )}

      {modalConfirmacao && animalParaExcluir && (
        <FormConfirmarExclusao
          animal={animalParaExcluir}
          onConfirmar={excluir}
          onCancelar={() => setModalConfirmacao(false)}
        />
      )}
    </div>
  );
}

export default Animais;

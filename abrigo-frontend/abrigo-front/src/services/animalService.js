import axios from "axios";

const API_URL = "http://localhost:8080/animais";

export const listarAnimais = () => axios.get(API_URL);
export const salvarAnimal = (animal) => axios.post(API_URL, animal);
export const excluirAnimal = (id) => axios.delete(`${API_URL}/${id}`);
export const listarDisponiveis = () => axios.get(`${API_URL}/disponiveis`);
export const listarPorEspecie = (id) => axios.get(`${API_URL}/por-especie/${id}`);
export const listarPorFuncionario = (id) => axios.get(`${API_URL}/por-funcionario/${id}`);
export const buscarPorTermo = (termo) => axios.get(`${API_URL}/buscar-por-termo?termo=${termo}`);
export const buscarPorId = (id) => axios.get(`${API_URL}/${id}`);
export const atualizarAnimal = (id, animal) => axios.put(`${API_URL}/${id}`, animal);
export const listarPorRaca = (id) => axios.get(`${API_URL}/por-raca/${id}`);
export const listarPorIdade = (idade) => axios.get(`${API_URL}/por-idade/${idade}`);
export const listarPorTamanho = (tamanho) => axios.get(`${API_URL}/por-tamanho/${tamanho}`);
export const listarPorDisponibilidade = (disponivel) => axios.get(`${API_URL}/por-disponibilidade/${disponivel}`);
export const listarPorSexo = (sexo) => axios.get(`${API_URL}/por-sexo/${sexo}`);
export const listarPorIdadeEEspecie = (idade, especie) => axios.get (`${API_URL}/por-idade-e-especie/${idade}/${especie}`);
export const listarPorIdadeERaca = (idade, raca) => axios.get(`${API_URL}/por-idade-e-raca/${idade}/${raca}`);
export const listarPorIdadeETamanho = (idade, tamanho) => axios.get(`${API_URL}/por-idade-e-tamanho/${idade}/${tamanho}`);
export const listarPorIdadeESexo = (idade, sexo) => axios.get(`${API_URL}/por-idade-e-sexo/${idade}/${sexo}`);
export const listarPorEspecieERaca = (especie, raca) => axios.get(`${API_URL}/por-especie-e-raca/${especie}/${raca}`);


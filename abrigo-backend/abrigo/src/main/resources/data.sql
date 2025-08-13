-- Espécies
INSERT INTO especie (id, nome) VALUES (1, 'Cão'), (2, 'Gato');

-- Raças
INSERT INTO raca (id, nome, especie_id) VALUES 
  (1, 'Golden Retriever', 1),
  (2, 'Poodle', 1),
  (3, 'Labrador', 1),
  (4, 'Beagle', 1),
  (5, 'SRD', 1),
  (6, 'Persa', 2),
  (7, 'Siamês', 2),
  (8, 'Angora', 2),
  (9, 'Maine Coon', 2),
  (10, 'SRD', 2);


-- Funcionários
INSERT INTO funcionario (id, nome, funcao) VALUES
  (1, 'João Silva', 'Veterinário'),
  (2, 'Maria Souza', 'Cuidadora'),
  (3, 'Pedro Lima', 'Tratador'),
  (4, 'Ana Paula', 'Administração'),
  (5, 'Carlos Mendes', 'Voluntário'),
  (6, 'Ramiro Zavala', 'Cuidador');

-- Animais - Gatos
INSERT INTO animal (
    id, nome, caracteristicas, doencas, tratamentos, disponivel_para_adocao,
    raca_id, funcionario_id, data_nascimento, data_entrada, data_adocao, data_obito
) VALUES
(1, 'Mimi', 'Pelagem branca', 'Dermatite', 'Pomada', true, 6, 1, '2020-03-10', '2023-01-15', NULL, NULL),
(2, 'Luna', 'Olhos azuis', '', '', true, 7, 2, '2019-07-22', '2022-11-01', '2023-06-10', NULL),
(3, 'Nina', 'Muito dócil', '', '', false, 8, 1, '2018-05-05', '2021-09-20', NULL, '2024-02-01'),
(4, 'Tigrinho', 'Listrado', 'Asma felina', 'Inalação', true, 9, 2, '2021-01-01', '2023-03-10', NULL, NULL),
(5, 'Bola', 'Gordinho', '', '', true, 10, 3, '2022-06-15', '2023-07-01', NULL, NULL),
(6, 'Fumaça', 'Cinza escuro', '', '', false, 6, 1, '2017-08-08', '2020-10-10', '2021-05-01', NULL),
(7, 'Pipoca', 'Branco e preto', '', '', true, 7, 2, '2021-12-25', '2022-01-10', NULL, NULL),
(8, 'Mochi', 'Pequeno e curioso', '', '', true, 8, 3, '2020-09-09', '2021-12-01', NULL, NULL),
(9, 'Zelda', 'Muito ativa', '', '', false, 9, 1, '2016-04-04', '2019-06-01', NULL, '2023-12-12'),
(10,'Kiara', 'Pelagem dourada', '', '', true, 10, 2, '2022-02-02', '2023-02-15', NULL, NULL);

-- Animais - Cachorros
INSERT INTO animal (
    id, nome, caracteristicas, doencas, tratamentos, disponivel_para_adocao,
    raca_id, funcionario_id, data_nascimento, data_entrada, data_adocao, data_obito
) VALUES
(11, 'Thor', 'Grande porte', 'Artrite', 'Fisioterapia', false, 1, 1, '2018-12-01', '2021-08-20', NULL, '2024-02-10'),
(12, 'Max', 'Muito brincalhão', '', '', true, 2, 2, '2020-05-05', '2022-03-01', NULL, NULL),
(13, 'Mel', 'Pelagem dourada', '', '', true, 3, 3, '2019-09-09', '2021-01-01', '2022-06-15', NULL),
(14, 'Bob', 'Latido forte', '', '', false, 4, 1, '2017-11-11', '2020-02-02', NULL, '2023-08-08'),
(15, 'Rex', 'Muito obediente', '', '', true, 5, 2, '2021-03-03', '2022-04-04', NULL, NULL),
(16, 'Léo', 'Pequeno porte', '', '', true, 1, 3, '2022-07-07', '2023-01-01', NULL, NULL),
(17, 'Nina', 'Muito carinhosa', '', '', false, 2, 1, '2016-06-06', '2019-09-09', '2020-12-12', NULL),
(18, 'Toby', 'Pelagem preta', '', '', true, 3, 2, '2020-10-10', '2021-11-11', NULL, NULL),
(19, 'Duke', 'Muito esperto', '', '', false, 4, 3, '2015-05-05', '2018-08-08', NULL, '2022-02-02'),
(20, 'Bella', 'Olhos castanhos', '', '', true, 5, 1, '2021-01-01', '2022-02-02', NULL, NULL);

-- Espécies
INSERT INTO especie (id, nome) VALUES (1, 'Cão'), (2, 'Gato');

-- Raças
INSERT INTO raca (id, nome, especie_id) VALUES 
  (1, 'Golden Retriever', 1),
  (2, 'Poodle', 1),
  (3, 'Persa', 2),
  (4, 'Siamês', 2),
  (5, 'Vira-lata', 1);

-- Funcionários
INSERT INTO funcionario (id, nome, funcao) VALUES
  (1, 'João Silva', 'Veterinário'),
  (2, 'Maria Souza', 'Cuidadora'),
  (3, 'Pedro Lima', 'Tratador'),
  (4, 'Ana Paula', 'Administração'),
  (5, 'Carlos Mendes', 'Voluntário'),
  (6, 'Ramiro Zavala', 'Cuidador');

-- Animais
INSERT INTO animal (
  id, nome, caracteristicas, doencas, tratamentos, 
  disponivel_para_adocao, raca_id, funcionario_id
) VALUES
  (1, 'Rex', 'Brincalhão', 'Nenhuma', 'Vermifugado', TRUE, 1, 1),
  (2, 'Luna', 'Mansinha', 'Alergia', 'Banhos especiais', FALSE, 2, 2),
  (3, 'Felix', 'Dorminhoco', 'Asma', 'Inalador', TRUE, 3, 3),
  (4, 'Mimi', 'Assustada', 'Nenhuma', 'Castração', TRUE, 4, 4),
  (5, 'Tobby', 'Agitado', 'Dermatite', 'Pomada', FALSE, 5, 5);

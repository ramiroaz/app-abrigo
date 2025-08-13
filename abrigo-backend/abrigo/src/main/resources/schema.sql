DROP TABLE IF EXISTS animal;
DROP TABLE IF EXISTS raca;
DROP TABLE IF EXISTS especie;
DROP TABLE IF EXISTS funcionario;

CREATE TABLE especie (
  id BIGINT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE raca (
  id BIGINT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  especie_id BIGINT NOT NULL,
  FOREIGN KEY (especie_id) REFERENCES especie(id)
);

CREATE TABLE funcionario (
  id BIGINT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  funcao VARCHAR(100) NOT NULL
);

CREATE TABLE animal (
  id BIGINT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  caracteristicas TEXT,
  doencas TEXT,
  tratamentos TEXT,
  disponivel_para_adocao BOOLEAN,
  raca_id BIGINT NOT NULL,
  funcionario_id BIGINT NOT NULL,
  data_nascimento DATE,
  data_entrada DATE,
  data_adocao DATE,
  data_obito DATE,
  FOREIGN KEY (raca_id) REFERENCES raca(id),
  FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)
);

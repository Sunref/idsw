DROP DATABASE IF EXISTS locacao_midias;
CREATE DATABASE locacao_midias CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE locacao_midias;

-- ========================================
-- Tabela: estado
-- ========================================
CREATE TABLE estado (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  sigla VARCHAR(2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (sigla)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: cidade
-- ========================================
CREATE TABLE cidade (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  estado_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX (estado_id),
  FOREIGN KEY (estado_id) REFERENCES estado(id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: cliente
-- ========================================
CREATE TABLE cliente (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(45) NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  email VARCHAR(60) NOT NULL,
  logradouro VARCHAR(50) NOT NULL,
  numero VARCHAR(6) NOT NULL,
  bairro VARCHAR(30) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  cidade_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (cpf),
  INDEX (cidade_id),
  FOREIGN KEY (cidade_id) REFERENCES cidade(id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: ator
-- ========================================
CREATE TABLE ator (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(45) NOT NULL,
  data_estreia DATE NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: genero
-- ========================================
CREATE TABLE genero (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: classificacao_etaria
-- ========================================
CREATE TABLE classificacao_etaria (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: tipo
-- ========================================
CREATE TABLE tipo (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: classificacao_interna
-- ========================================
CREATE TABLE classificacao_interna (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  valor_aluguel DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: midia
-- ========================================
CREATE TABLE midia (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  ano_lancamento INT NOT NULL,
  codigo_barras VARCHAR(13) NOT NULL,
  duracao_em_minutos INT NOT NULL,
  ator_principal INT NOT NULL,
  ator_coadjuvante INT NOT NULL,
  genero_id INT NOT NULL,
  classificacao_etaria_id INT NOT NULL,
  tipo_id INT NOT NULL,
  classificacao_interna_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (codigo_barras),
  FOREIGN KEY (ator_principal) REFERENCES ator(id),
  FOREIGN KEY (ator_coadjuvante) REFERENCES ator(id),
  FOREIGN KEY (genero_id) REFERENCES genero(id),
  FOREIGN KEY (classificacao_etaria_id) REFERENCES classificacao_etaria(id),
  FOREIGN KEY (tipo_id) REFERENCES tipo(id),
  FOREIGN KEY (classificacao_interna_id) REFERENCES classificacao_interna(id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: locacao
-- ========================================
CREATE TABLE locacao (
  id INT NOT NULL AUTO_INCREMENT,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  cancelada TINYINT(1) NOT NULL,
  cliente_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX (cliente_id),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: exemplar
-- ========================================
CREATE TABLE exemplar (
  codigo_interno INT NOT NULL AUTO_INCREMENT,
  disponivel TINYINT(1) NOT NULL,
  midia_id INT NOT NULL,
  PRIMARY KEY (codigo_interno),
  INDEX (midia_id),
  FOREIGN KEY (midia_id) REFERENCES midia(id)
) ENGINE=InnoDB;

-- ========================================
-- Tabela: item_locacao
-- ========================================
CREATE TABLE item_locacao (
  locacao_id INT NOT NULL,
  exemplar_codigo_interno INT NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (locacao_id, exemplar_codigo_interno),
  INDEX (exemplar_codigo_interno),
  FOREIGN KEY (locacao_id) REFERENCES locacao(id),
  FOREIGN KEY (exemplar_codigo_interno) REFERENCES exemplar(codigo_interno)
) ENGINE=InnoDB;

-- ========================================
-- Inserts: estado
-- ========================================
INSERT INTO estado (id, nome, sigla) VALUES
  (1, 'São Paulo', 'SP'),
  (2, 'Minas Gerais', 'MG');

-- ========================================
-- Inserts: cidade
-- ========================================
INSERT INTO cidade (id, nome, estado_id) VALUES
  (1, 'Vargem Grande do Sul', 1),
  (2, 'São João da Boa Vista', 1),
  (3, 'Poços de Caldas', 2);

-- ========================================
-- Inserts: cliente
-- ========================================
INSERT INTO cliente (id, nome, sobrenome, data_nascimento, cpf, email, logradouro, numero, bairro, cep, cidade_id) VALUES
  (1, 'João', 'da Silva', '1999-10-10', '111.111.111-11', 'joao@joao.com.br', 'Rua Hermenegildo Cossi', '750', 'Jardim Fortaleza', '13880-000', 1),
  (2, 'Maria', 'Rodrigues', '1974-05-16', '222.222.222-22', 'mariarod@gmail.com', 'Rua Patrocínio Rodrigues', '120', 'Centro', '13880-000', 1),
  (3, 'Marcela', 'dos Santos', '1985-09-25', '333.333.333-33', 'mdossantos@uol.com.br', 'Rua Primeirod de Maio', '219', 'Centro', '13880-000', 1);

-- ========================================
-- Inserts: ator
-- ========================================
INSERT INTO ator (id, nome, sobrenome, data_estreia) VALUES
  (1, 'Keanu', 'Reeves', '1980-10-10'),
  (2, 'Laurence', 'Fishburne', '1970-10-10'),
  (3, 'Daniel', 'Radcliffe', '1999-10-10'),
  (4, 'Emma', 'Watson', '2000-10-10');

-- ========================================
-- Inserts: genero
-- ========================================
INSERT INTO genero (id, descricao) VALUES
  (1, 'Comédia'),
  (2, 'Aventura'),
  (3, 'Ação');

-- ========================================
-- Inserts: classificacao_etaria
-- ========================================
INSERT INTO classificacao_etaria (id, descricao) VALUES
  (1, 'Infantil'),
  (2, 'Maior que 18');

-- ========================================
-- Inserts: tipo
-- ========================================
INSERT INTO tipo (id, descricao) VALUES
  (1, 'BluRay'),
  (2, 'DVD');

-- ========================================
-- Inserts: classificacao_interna
-- ========================================
INSERT INTO classificacao_interna (id, descricao, valor_aluguel) VALUES
  (1, 'Lançamento', 10.00),
  (2, 'Padrão', 5.50),
  (3, 'Promoção', 4.00);

-- ========================================
-- Inserts: midia
-- ========================================
INSERT INTO midia (id, titulo, ano_lancamento, codigo_barras, duracao_em_minutos, ator_principal, ator_coadjuvante, genero_id, classificacao_etaria_id, tipo_id, classificacao_interna_id) VALUES
  (1, 'Harry Potter e a Pedra Filosofal', 2001, '1231231231231', 125, 3, 4, 2, 1, 1, 2),
  (2, 'Matrix', 1999, '4564564564564', 136, 1, 2, 3, 2, 2, 3);

-- ========================================
-- Inserts: exemplar
-- ========================================
INSERT INTO exemplar (codigo_interno, disponivel, midia_id) VALUES
  (1, 1, 1),
  (2, 1, 1),
  (3, 1, 1),
  (4, 1, 1),
  (5, 1, 1),
  (6, 1, 1),
  (7, 1, 2),
  (8, 1, 2),
  (9, 1, 2),
  (10, 1, 2);


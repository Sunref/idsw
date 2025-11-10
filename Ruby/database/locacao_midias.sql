DROP DATABASE IF EXISTS locacao_midias;
CREATE DATABASE locacao_midias CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE locacao_midias;

CREATE TABLE estado (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  sigla VARCHAR(2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (sigla)
) ENGINE=InnoDB;

CREATE TABLE cidade (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  estado_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX (estado_id),
  FOREIGN KEY (estado_id) REFERENCES estado(id)
) ENGINE=InnoDB;

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

CREATE TABLE ator (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(45) NOT NULL,
  data_estreia DATE NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE genero (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE classificacao_etaria (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tipo (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE classificacao_interna (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL,
  valor_aluguel DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

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

CREATE TABLE exemplar (
  codigo_interno INT NOT NULL AUTO_INCREMENT,
  disponivel TINYINT(1) NOT NULL,
  midia_id INT NOT NULL,
  PRIMARY KEY (codigo_interno),
  INDEX (midia_id),
  FOREIGN KEY (midia_id) REFERENCES midia(id)
) ENGINE=InnoDB;

CREATE TABLE item_locacao (
  locacao_id INT NOT NULL,
  exemplar_codigo_interno INT NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (locacao_id, exemplar_codigo_interno),
  INDEX (exemplar_codigo_interno),
  FOREIGN KEY (locacao_id) REFERENCES locacao(id),
  FOREIGN KEY (exemplar_codigo_interno) REFERENCES exemplar(codigo_interno)
) ENGINE=InnoDB;

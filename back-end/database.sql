create database market_cubos;

create table usuarios (
  id serial primary key,
  nome varchar(255) not null,
  nome_loja varchar(255) not null,
  email varchar(255) not null unique,
  senha varchar(255) not null
);

create table produtos (
  id serial primary key,
  usuario_id serial,
  nome varchar(255) not null,
  estoque smallint not null,
  categoria varchar(255),
  preco integer not null,
  descricao varchar(255) not null,
  imagem text,
  foreign key (usuario_id) references usuarios (id)
);

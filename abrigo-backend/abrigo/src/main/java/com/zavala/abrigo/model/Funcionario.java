package com.zavala.abrigo.model;

import jakarta.persistence.*;

@Entity
public class Funcionario {

    @Id
    private Long id;

    private String nome;

    private String funcao;

    public Funcionario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFuncao() { return funcao; }
    public void setFuncao(String funcao) { this.funcao = funcao; }
}

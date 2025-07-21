package com.zavala.abrigo.model;

import jakarta.persistence.*;

@Entity
public class Animal {

    @Id
    private Long id;

    private String nome;

    private String caracteristicas;

    private String doencas;

    private String tratamentos;

    private Boolean disponivelParaAdocao;

    @ManyToOne
    @JoinColumn(name = "raca_id", nullable = false)
    private Raca raca;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    public Animal() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCaracteristicas() { return caracteristicas; }
    public void setCaracteristicas(String caracteristicas) { this.caracteristicas = caracteristicas; }

    public String getDoencas() { return doencas; }
    public void setDoencas(String doencas) { this.doencas = doencas; }

    public String getTratamentos() { return tratamentos; }
    public void setTratamentos(String tratamentos) { this.tratamentos = tratamentos; }

    public Boolean getDisponivelParaAdocao() { return disponivelParaAdocao; }
    public void setDisponivelParaAdocao(Boolean disponivelParaAdocao) { this.disponivelParaAdocao = disponivelParaAdocao; }

    public Raca getRaca() { return raca; }
    public void setRaca(Raca raca) { this.raca = raca; }

    public Funcionario getFuncionario() { return funcionario; }
    public void setFuncionario(Funcionario funcionario) { this.funcionario = funcionario; }
}

package com.zavala.abrigo.model;

import java.time.LocalDate;

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
    
    private LocalDate dataNascimento;
    private LocalDate dataEntrada;
    private LocalDate dataAdocao;
    private LocalDate dataObito;

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

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public LocalDate getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(LocalDate dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public LocalDate getDataAdocao() {
		return dataAdocao;
	}

	public void setDataAdocao(LocalDate dataAdocao) {
		this.dataAdocao = dataAdocao;
	}

	public LocalDate getDataObito() {
		return dataObito;
	}

	public void setDataObito(LocalDate dataObito) {
		this.dataObito = dataObito;
	}
    
    
}

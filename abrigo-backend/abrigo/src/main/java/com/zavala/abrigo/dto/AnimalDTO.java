package com.zavala.abrigo.dto;

import java.time.LocalDate;

public class AnimalDTO {

    private Long id;
    private String nome;
    private String caracteristicas;
    private String doencas;
    private String tratamentos;
    private Boolean disponivelParaAdocao;
    private Long racaId;
    private String nomeRaca;
    private String nomeEspecie;
    private Long funcionarioId;
    private String nomeResponsavel;
    
    private LocalDate dataNascimento;
    private LocalDate dataEntrada;
    private LocalDate dataAdocao;
    private LocalDate dataObito;
    private String idadeEstimada; // Calculado

    public AnimalDTO() {}

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

    public Long getRacaId() { return racaId; }
    public void setRacaId(Long racaId) { this.racaId = racaId; }

    public String getNomeRaca() { return nomeRaca; }
    public void setNomeRaca(String nomeRaca) { this.nomeRaca = nomeRaca; }

    public String getNomeEspecie() { return nomeEspecie; }
    public void setNomeEspecie(String nomeEspecie) { this.nomeEspecie = nomeEspecie; }

    public Long getFuncionarioId() { return funcionarioId; }
    public void setFuncionarioId(Long funcionarioId) { this.funcionarioId = funcionarioId; }

    public String getNomeResponsavel() { return nomeResponsavel; }
    public void setNomeResponsavel(String nomeResponsavel) { this.nomeResponsavel = nomeResponsavel; }

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

	public String getIdadeEstimada() {
		return idadeEstimada;
	}

	public void setIdadeEstimada(String idadeEstimada) {
		this.idadeEstimada = idadeEstimada;
	}
    
    
}

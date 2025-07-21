package com.zavala.abrigo.dto;

public class RacaDTO {

    private Long id;
    private String nome;
    private Long especieId;
    private String nomeEspecie;

    public RacaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Long getEspecieId() { return especieId; }
    public void setEspecieId(Long especieId) { this.especieId = especieId; }

    public String getNomeEspecie() { return nomeEspecie; }
    public void setNomeEspecie(String nomeEspecie) { this.nomeEspecie = nomeEspecie; }
}

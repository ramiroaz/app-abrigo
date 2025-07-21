package com.zavala.abrigo.dto;

import java.util.List;

public class EspecieDTO {

    private Long id;
    private String nome;
    private List<String> racas;

    public EspecieDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<String> getRacas() { return racas; }
    public void setRacas(List<String> racas) { this.racas = racas; }
}

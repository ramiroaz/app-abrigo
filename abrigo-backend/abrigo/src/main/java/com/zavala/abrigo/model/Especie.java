package com.zavala.abrigo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Especie {

    @Id
    private Long id;

    private String nome;

    @OneToMany(mappedBy = "especie", cascade = CascadeType.ALL)
    private List<Raca> racas;

    public Especie() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<Raca> getRacas() { return racas; }
    public void setRacas(List<Raca> racas) { this.racas = racas; }
}

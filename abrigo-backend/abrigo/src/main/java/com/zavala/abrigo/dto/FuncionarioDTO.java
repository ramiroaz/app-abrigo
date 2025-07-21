package com.zavala.abrigo.dto;

import jakarta.validation.constraints.NotBlank;

public class FuncionarioDTO {

    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Função é obrigatória")
    private String funcao;

    public FuncionarioDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFuncao() { return funcao; }
    public void setFuncao(String funcao) { this.funcao = funcao; }
}

package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.FuncionarioDTO;
import com.zavala.abrigo.model.Funcionario;
import com.zavala.abrigo.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    private final FuncionarioRepository repo;

    public FuncionarioService(FuncionarioRepository repo) {
        this.repo = repo;
    }

    public List<FuncionarioDTO> listar() {
        return repo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public FuncionarioDTO buscar(Long id) {
        Funcionario f = repo.findById(id).orElse(null);
        return toDTO(f);
    }

    public void salvar(FuncionarioDTO dto) {
        Funcionario f = new Funcionario();
        f.setId(dto.getId());
        f.setNome(dto.getNome());
        f.setFuncao(dto.getFuncao());
        repo.save(f);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }

    private FuncionarioDTO toDTO(Funcionario f) {
        if (f == null) return null;
        FuncionarioDTO dto = new FuncionarioDTO();
        dto.setId(f.getId());
        dto.setNome(f.getNome());
        dto.setFuncao(f.getFuncao());
        return dto;
    }
}

package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.EspecieDTO;
import com.zavala.abrigo.model.Especie;
import com.zavala.abrigo.repository.EspecieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EspecieService {

    private final EspecieRepository repo;

    public EspecieService(EspecieRepository repo) {
        this.repo = repo;
    }

    public List<EspecieDTO> listar() {
        return repo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EspecieDTO buscar(Long id) {
        Especie e = repo.findById(id).orElse(null);
        return toDTO(e);
    }

    public void salvar(EspecieDTO dto) {
        Especie e = new Especie();
        e.setId(dto.getId());
        e.setNome(dto.getNome());
        repo.save(e);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }

    private EspecieDTO toDTO(Especie e) {
        if (e == null) return null;
        EspecieDTO dto = new EspecieDTO();
        dto.setId(e.getId());
        dto.setNome(e.getNome());
        if (e.getRacas() != null) {
            List<String> nomes = e.getRacas().stream().map(r -> r.getNome()).collect(Collectors.toList());
            dto.setRacas(nomes);
        }
        return dto;
    }
}

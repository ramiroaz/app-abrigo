package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.RacaDTO;
import com.zavala.abrigo.model.Raca;
import com.zavala.abrigo.repository.EspecieRepository;
import com.zavala.abrigo.repository.RacaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RacaService {

    private final RacaRepository racaRepo;
    private final EspecieRepository especieRepo;

    public RacaService(RacaRepository racaRepo, EspecieRepository especieRepo) {
        this.racaRepo = racaRepo;
        this.especieRepo = especieRepo;
    }

    public List<RacaDTO> listar() {
        return racaRepo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public RacaDTO buscar(Long id) {
        Raca r = racaRepo.findById(id).orElse(null);
        return toDTO(r);
    }

    public void salvar(RacaDTO dto) {
        Raca r = new Raca();
        r.setId(dto.getId());
        r.setNome(dto.getNome());
        r.setEspecie(especieRepo.findById(dto.getEspecieId()).orElse(null));
        racaRepo.save(r);
    }

    public void excluir(Long id) {
        racaRepo.deleteById(id);
    }

    private RacaDTO toDTO(Raca r) {
        if (r == null) return null;
        RacaDTO dto = new RacaDTO();
        dto.setId(r.getId());
        dto.setNome(r.getNome());
        dto.setEspecieId(r.getEspecie().getId());
        dto.setNomeEspecie(r.getEspecie().getNome());
        return dto;
    }
}

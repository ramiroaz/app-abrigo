package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.AnimalDTO;
import com.zavala.abrigo.model.Animal;
import com.zavala.abrigo.repository.AnimalRepository;
import com.zavala.abrigo.repository.FuncionarioRepository;
import com.zavala.abrigo.repository.RacaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    private final AnimalRepository animalRepo;
    private final RacaRepository racaRepo;
    private final FuncionarioRepository funcionarioRepo;

    public AnimalService(AnimalRepository animalRepo, RacaRepository racaRepo, FuncionarioRepository funcionarioRepo) {
        this.animalRepo = animalRepo;
        this.racaRepo = racaRepo;
        this.funcionarioRepo = funcionarioRepo;
    }

    public List<AnimalDTO> listarTodos() {
        return animalRepo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AnimalDTO buscarPorId(Long id) {
        Animal a = animalRepo.findById(id).orElse(null);
        return toDTO(a);
    }

    public void salvar(AnimalDTO dto) {
        Animal a = new Animal();
        a.setId(dto.getId());
        a.setNome(dto.getNome());
        a.setCaracteristicas(dto.getCaracteristicas());
        a.setDoencas(dto.getDoencas());
        a.setTratamentos(dto.getTratamentos());
        a.setDisponivelParaAdocao(dto.getDisponivelParaAdocao());

        a.setRaca(racaRepo.findById(dto.getRacaId()).orElse(null));
        a.setFuncionario(funcionarioRepo.findById(dto.getFuncionarioId()).orElse(null));

        animalRepo.save(a);
    }

    public void excluir(Long id) {
        animalRepo.deleteById(id);
    }

    public List<AnimalDTO> listarDisponiveis() {
        return animalRepo.findByDisponivelParaAdocaoTrue().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AnimalDTO> listarPorEspecie(Long especieId) {
        return animalRepo.findByRacaEspecieId(especieId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AnimalDTO> listarPorFuncionario(Long funcionarioId) {
        return animalRepo.findByFuncionarioId(funcionarioId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AnimalDTO> buscarPorTermo(String termo) {
        return animalRepo.buscarAnimaisPorCaracteristicaOuDoenca(termo)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    private AnimalDTO toDTO(Animal a) {
        if (a == null) return null;
        AnimalDTO dto = new AnimalDTO();
        dto.setId(a.getId());
        dto.setNome(a.getNome());
        dto.setCaracteristicas(a.getCaracteristicas());
        dto.setDoencas(a.getDoencas());
        dto.setTratamentos(a.getTratamentos());
        dto.setDisponivelParaAdocao(a.getDisponivelParaAdocao());
        dto.setRacaId(a.getRaca().getId());
        dto.setNomeRaca(a.getRaca().getNome());
        dto.setNomeEspecie(a.getRaca().getEspecie().getNome());
        dto.setFuncionarioId(a.getFuncionario().getId());
        dto.setNomeResponsavel(a.getFuncionario().getNome());
        return dto;
    }
}

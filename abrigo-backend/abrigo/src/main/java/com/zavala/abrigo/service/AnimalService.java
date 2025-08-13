package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.AnimalDTO;
import com.zavala.abrigo.exception.ValidacaoException;
import com.zavala.abrigo.model.Animal;
import com.zavala.abrigo.repository.AnimalRepository;
import com.zavala.abrigo.repository.FuncionarioRepository;
import com.zavala.abrigo.repository.RacaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    private final AnimalRepository animalRepo;
    private final RacaRepository racaRepo;
    private final FuncionarioRepository funcionarioRepo;

    @Autowired
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
    	validarDados(dto);
    	Animal a = new Animal();
        a.setId(dto.getId());
        a.setNome(dto.getNome());
        a.setCaracteristicas(dto.getCaracteristicas());
        a.setDoencas(dto.getDoencas());
        a.setTratamentos(dto.getTratamentos());
        a.setDisponivelParaAdocao(dto.getDisponivelParaAdocao());
        a.setDataAdocao(dto.getDataAdocao());
        a.setDataEntrada(dto.getDataEntrada());
        a.setDataNascimento(dto.getDataNascimento());
        a.setDataObito(dto.getDataObito());

        a.setRaca(racaRepo.findById(dto.getRacaId()).orElse(null));
        a.setFuncionario(funcionarioRepo.findById(dto.getFuncionarioId()).orElse(null));

        animalRepo.save(a);
    }
    
    public AnimalDTO atualizar(Long id, AnimalDTO dto) {
    	if (!animalRepo.existsById(id)) {
    		throw new ValidacaoException("Animal com ID " + id + " não encontrado.");
        }
        validarDados(dto);
        Animal atualizado = toEntity(dto);
        atualizado.setId(id);
        Animal salvo = animalRepo.save(atualizado);
        return toDTO(salvo);
    }

    public void excluir(Long id) {
        animalRepo.deleteById(id);
    }

    private String calcularIdadeEstimada(LocalDate nascimento) {
        if (nascimento == null) return "Desconhecida";
        Period p = Period.between(nascimento, LocalDate.now());
        return p.getYears() + " anos e " + p.getMonths() + " meses";
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
        dto.setDataAdocao(a.getDataAdocao());
        dto.setDataEntrada(a.getDataEntrada());
        dto.setDataNascimento(a.getDataNascimento());
        dto.setDataObito(a.getDataObito());
        dto.setIdadeEstimada(calcularIdadeEstimada(a.getDataNascimento()));  //campo calculado
        return dto;
    }
    
    private Animal toEntity(AnimalDTO dto) {
    	if (dto == null) return null;
    	Animal animal = new Animal();
    	animal.setId(dto.getId());
        animal.setNome(dto.getNome());
        animal.setCaracteristicas(dto.getCaracteristicas());
        animal.setDoencas(dto.getDoencas());
        animal.setTratamentos(dto.getTratamentos());
        animal.setDisponivelParaAdocao(dto.getDisponivelParaAdocao());

        animal.setRaca(racaRepo.findById(dto.getRacaId()).orElse(null));
        animal.setFuncionario(funcionarioRepo.findById(dto.getFuncionarioId()).orElse(null));

        animal.setDataNascimento(dto.getDataNascimento());
        animal.setDataEntrada(dto.getDataEntrada());
        animal.setDataAdocao(dto.getDataAdocao());
        animal.setDataObito(dto.getDataObito());

        return animal;
    	
    }
    
    private void validarDados(AnimalDTO dto) {
        LocalDate hoje = LocalDate.now();

        if (dto.getDataNascimento() != null) {
            if (dto.getDataNascimento().isBefore(hoje.minusYears(50))) {
                throw new ValidacaoException("Data de nascimento estimada não pode ser superior a 50 anos atrás.");
            }
        }

        if (dto.getDataEntrada() != null && dto.getDataNascimento() != null) {
            if (dto.getDataEntrada().isBefore(dto.getDataNascimento())) {
                throw new ValidacaoException("Data de entrada deve ser posterior à data de nascimento estimada.");
            }
        }

        if (dto.getDataAdocao() != null) {
            if (dto.getDataEntrada() != null && dto.getDataAdocao().isBefore(dto.getDataEntrada())) {
                throw new ValidacaoException("Data de adoção deve ser posterior ou igual à data de entrada.");
            }
            if (dto.getDataObito() != null) {
                throw new ValidacaoException("Animal não pode ter data de adoção se já possui data de óbito.");
            }
        }

        if (dto.getDataObito() != null && dto.getDataEntrada() != null) {
            if (dto.getDataObito().isBefore(dto.getDataEntrada())) {
                throw new ValidacaoException("Data de óbito deve ser posterior ou igual à data de entrada.");
            }
        }
    }
}

package com.zavala.abrigo.service;

import com.zavala.abrigo.dto.AnimalDTO;
import com.zavala.abrigo.model.Animal;
import com.zavala.abrigo.model.Funcionario;
import com.zavala.abrigo.model.Raca;
import com.zavala.abrigo.model.Especie;
import com.zavala.abrigo.repository.AnimalRepository;
import com.zavala.abrigo.repository.FuncionarioRepository;
import com.zavala.abrigo.repository.RacaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AnimalServiceTest {

    private AnimalRepository animalRepo;
    private RacaRepository racaRepo;
    private FuncionarioRepository funcionarioRepo;
    private AnimalService service;

    @BeforeEach
    void setUp() {
        animalRepo = mock(AnimalRepository.class);
        racaRepo = mock(RacaRepository.class);
        funcionarioRepo = mock(FuncionarioRepository.class);
        service = new AnimalService(animalRepo, racaRepo, funcionarioRepo);
    }

    @Test
    void testListarTodos() {
        Animal a = criarAnimalExemplo(1L, "Rex");
        when(animalRepo.findAll()).thenReturn(List.of(a));

        List<AnimalDTO> dtos = service.listarTodos();

        assertEquals(1, dtos.size());
        assertEquals("Rex", dtos.get(0).getNome());
        assertEquals("Golden", dtos.get(0).getNomeRaca());
    }

    @Test
    void testBuscarPorId() {
        Animal a = criarAnimalExemplo(1L, "Luna");
        when(animalRepo.findById(1L)).thenReturn(Optional.of(a));

        AnimalDTO dto = service.buscarPorId(1L);

        assertNotNull(dto);
        assertEquals("Luna", dto.getNome());
    }

    @Test
    void testSalvar() {
        AnimalDTO dto = new AnimalDTO();
        dto.setId(99L);
        dto.setNome("Rocky");
        dto.setRacaId(2L);
        dto.setFuncionarioId(3L);
        dto.setDisponivelParaAdocao(true);

        Raca raca = new Raca();
        raca.setId(2L);
        raca.setNome("Poodle");
        Especie especie = new Especie();
        especie.setId(1L);
        especie.setNome("Cão");
        raca.setEspecie(especie);

        Funcionario funcionario = new Funcionario();
        funcionario.setId(3L);
        funcionario.setNome("Maria");

        when(racaRepo.findById(2L)).thenReturn(Optional.of(raca));
        when(funcionarioRepo.findById(3L)).thenReturn(Optional.of(funcionario));

        service.salvar(dto);

        verify(animalRepo, times(1)).save(any(Animal.class));
    }

    @Test
    void testListarDisponiveis() {
        Animal a = criarAnimalExemplo(2L, "Felix");
        a.setDisponivelParaAdocao(true);

        when(animalRepo.findByDisponivelParaAdocaoTrue()).thenReturn(List.of(a));

        List<AnimalDTO> resultado = service.listarDisponiveis();

        assertEquals(1, resultado.size());
        assertTrue(resultado.get(0).getDisponivelParaAdocao());
        assertEquals("Felix", resultado.get(0).getNome());
    }

    private Animal criarAnimalExemplo(Long id, String nome) {
        Animal a = new Animal();
        a.setId(id);
        a.setNome(nome);
        a.setCaracteristicas("Brincalhão");
        a.setDoencas("Nenhuma");
        a.setTratamentos("Vacinação");
        a.setDisponivelParaAdocao(true);

        Raca r = new Raca();
        r.setId(1L);
        r.setNome("Golden");
        Especie e = new Especie();
        e.setId(1L);
        e.setNome("Cão");
        r.setEspecie(e);
        a.setRaca(r);

        Funcionario f = new Funcionario();
        f.setId(1L);
        f.setNome("João");
        f.setFuncao("Veterinário");
        a.setFuncionario(f);

        return a;
    }
}

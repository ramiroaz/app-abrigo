package com.zavala.abrigo.controller;

import com.zavala.abrigo.dto.AnimalDTO;
import com.zavala.abrigo.service.AnimalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
public class AnimalController {

    private final AnimalService service;

    public AnimalController(AnimalService service) {
        this.service = service;
    }

    @GetMapping
    public List<AnimalDTO> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public AnimalDTO buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public void salvar(@RequestBody AnimalDTO dto) {
        service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }

    @GetMapping("/disponiveis")
    public List<AnimalDTO> listarDisponiveis() {
        return service.listarDisponiveis();
    }
    
    @GetMapping("/adotados")
    public List<AnimalDTO> listarAdotados() {
        return service.listarAdotados();
    }

    @GetMapping("/por-especie/{id}")
    public List<AnimalDTO> listarPorEspecie(@PathVariable Long id) {
        return service.listarPorEspecie(id);
    }

    @GetMapping("/por-funcionario/{id}")
    public List<AnimalDTO> listarPorFuncionario(@PathVariable Long id) {
        return service.listarPorFuncionario(id);
    }
    
    @GetMapping("/buscar-por-termo")
    public List<AnimalDTO> buscarPorTermo(@RequestParam String termo) {
        return service.buscarPorTermo(termo);
        // Exemplo de chamada: GET /animais/buscar-por-termo?termo=asma
    }

    
}

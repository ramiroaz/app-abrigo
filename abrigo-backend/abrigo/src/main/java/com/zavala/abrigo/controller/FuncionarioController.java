package com.zavala.abrigo.controller;

import com.zavala.abrigo.dto.FuncionarioDTO;
import com.zavala.abrigo.service.FuncionarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    private final FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<FuncionarioDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public FuncionarioDTO buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public void salvar(@RequestBody FuncionarioDTO dto) {
        service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}

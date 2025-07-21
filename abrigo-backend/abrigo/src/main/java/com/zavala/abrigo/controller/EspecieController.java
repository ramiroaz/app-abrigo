package com.zavala.abrigo.controller;

import com.zavala.abrigo.dto.EspecieDTO;
import com.zavala.abrigo.service.EspecieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/especies")
public class EspecieController {

    private final EspecieService service;

    public EspecieController(EspecieService service) {
        this.service = service;
    }

    @GetMapping
    public List<EspecieDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public EspecieDTO buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public void salvar(@RequestBody EspecieDTO dto) {
        service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}

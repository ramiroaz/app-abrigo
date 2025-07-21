package com.zavala.abrigo.controller;

import com.zavala.abrigo.dto.RacaDTO;
import com.zavala.abrigo.service.RacaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/racas")
public class RacaController {

    private final RacaService service;

    public RacaController(RacaService service) {
        this.service = service;
    }

    @GetMapping
    public List<RacaDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public RacaDTO buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public void salvar(@RequestBody RacaDTO dto) {
        service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}

package com.zavala.abrigo.repository;

import com.zavala.abrigo.model.Raca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RacaRepository extends JpaRepository<Raca, Long> {
    List<Raca> findByEspecieId(Long especieId);
}

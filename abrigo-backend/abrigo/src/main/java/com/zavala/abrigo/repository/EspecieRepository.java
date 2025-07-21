package com.zavala.abrigo.repository;

import com.zavala.abrigo.model.Especie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EspecieRepository extends JpaRepository<Especie, Long> {
    // Pode-se adicionar métodos personalizados futuramente, ex:
    // List<Especie> findByNomeContainingIgnoreCase(String termo);
}

package com.zavala.abrigo.repository;

import com.zavala.abrigo.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findByDisponivelParaAdocaoTrue();

    List<Animal> findByRacaEspecieId(Long especieId);

    List<Animal> findByFuncionarioId(Long funcionarioId);

    List<Animal> findByNomeContainingIgnoreCase(String termo);
    
    @Query("SELECT a FROM Animal a " +
    	       "WHERE a.disponivelParaAdocao = TRUE AND " +
    	       "(LOWER(a.caracteristicas) LIKE LOWER(CONCAT('%', :termo, '%')) " +
    	       "OR LOWER(a.doencas) LIKE LOWER(CONCAT('%', :termo, '%')))")
    	List<Animal> buscarAnimaisPorCaracteristicaOuDoenca(@Param("termo") String termo);
}

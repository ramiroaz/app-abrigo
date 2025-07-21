package com.zavala.abrigo.repository;

import com.zavala.abrigo.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    List<Funcionario> findByFuncaoContainingIgnoreCase(String funcao);
}

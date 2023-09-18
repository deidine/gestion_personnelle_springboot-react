package deidine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import deidine.model.Fonction;

@Repository
public interface FonctionRepository extends JpaRepository<Fonction, Integer> {
	
}


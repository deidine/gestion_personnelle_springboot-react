package deidine.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import deidine.model.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
	
	//  Integer countByNom(String nom); 
}

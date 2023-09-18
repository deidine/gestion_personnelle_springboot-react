package deidine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import deidine.model.Department;
import deidine.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}

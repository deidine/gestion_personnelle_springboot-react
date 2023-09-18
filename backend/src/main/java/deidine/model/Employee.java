package deidine.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@Entity
    // @JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	// ,columnDefinition = "varchar(22) default 'Aayush'"

	@Column(name = "matricule", unique = true)
	private String matricule;

	@Column(name = "nom", columnDefinition = "varchar(22) ")
	private String nom;

	@Column(name = "prenom", columnDefinition = "varchar(22) ")
	private String prenom;
@Column( unique = true)
	private String phoneNo;

	@Column(name = "grade", nullable = false, columnDefinition = "varchar(22)")
	private String grade;
 
	@Column(name = "rangeEmp", columnDefinition = "varchar(22) ")
	private String range;
	@Column(name = "date_naissence")
	private Date date_naissence;
	private String gender;
	@Column(name = "date_emboche")
	private Date date_emboche;
	@Column(name = "email", unique = true)
	private String email;
	// @JsonIgnore
	
	@OneToOne(cascade = CascadeType.MERGE )
	private Fonction fonction;
	
	@Transient
	private Integer functionID;
	
	@OneToOne(cascade = CascadeType.MERGE )
	private Service serviceDepartment;;
	
	@Transient
	private Integer serviceID;

	@Enumerated(EnumType.ORDINAL)
	private City city;

	public Employee() {

	}

}

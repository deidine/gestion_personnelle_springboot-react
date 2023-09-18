package deidine.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
@EqualsAndHashCode
public class Fonction  {
	
	/**
	 * 
	 */
	// private static final long serialVersionUID = 468943233335922874L;
	
	// @JsonIgnore
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	private String code;
	
	private String nom;

	
}

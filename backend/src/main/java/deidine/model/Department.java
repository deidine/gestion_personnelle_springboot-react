package deidine.model;

import lombok.*;

import javax.persistence.*;



/***
 * Department.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@Setter
@AllArgsConstructor
@Builder
@Getter
@EqualsAndHashCode
@Entity
// @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,
// property="departmentId")
// @JsonIgnoreProperties(ignoreUnknown = true,allowSetters = true)

public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int departmentId;
    @Column(name = "department_name")
    private String departmentName;
    @Column(name = "department_url")
    private String departmentUrl;
    @Column(name = "department_titre")
    private String departmentTitre;
    // @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    // @ManyToOne
    // // @JsonIgnore
    // // @JsonManagedReference
    // private Entite entite;

    public Department() {
        // entites = new HashSet<>();
    }

}

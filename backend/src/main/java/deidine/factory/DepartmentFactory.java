package deidine.factory;

import deidine.model.Department;
// import deidine.entity.Faculty;

/***
 * DepartmentFactory.java
 * @author Elvis Ndlangamandla (213063964)
 * Date: 21 August 2022
 */
public class DepartmentFactory
{
    public static Department build(String departmentName, String departmentUrl, String departmentTitre)
    {
        return Department.builder().departmentName(departmentName)
                                   .departmentUrl(departmentUrl)
                                   .departmentTitre(departmentTitre)
                                   .build();
    }
}
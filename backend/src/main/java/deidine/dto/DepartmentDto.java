package deidine.dto;
 
import java.util.List;
import java.util.Set;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data; 

@Data  
 @Builder
    public class DepartmentDto {
      @ApiModelProperty(position = 0)
      private Integer id;
      @ApiModelProperty(position = 1)
      private String departmentName;
      @ApiModelProperty(position = 2)
      private String departmentUrl;
      
      @ApiModelProperty(position = 3)
      private String departmentTitre;
 
    }
      
 
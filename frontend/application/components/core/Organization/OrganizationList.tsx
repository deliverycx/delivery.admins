import { IPoint, ListOrganization } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganization } from "domains/useCase/organization/useCase.Organization"
import { FC } from "react"

type IProps = {
  organizations:ListOrganization[]
}

const OrganizationList: FC<IProps> = ({ organizations }) => {
  const useCasePoints = adapterComponentUseCase(useOrganization)
  const {handlePuckUp} = useCasePoints.handlers

  return (
    <>
    {
      organizations && 
        organizations.map((org: ListOrganization, index: number) => {
          if (org) {
            return (
              
              <div key={index} className="card">
                <div className="card-header">
                  <h3 className="card-title">{org.name}</h3>

                  </div>
                  {
                    org.organizations.map((point: IPoint, i: number) => {
                      return (
                        <div key={point.id} className="card-body">
                          
                          <div className="card-footer">
                           <h3 className="card-title">{point.address.street}</h3>
                          <br/> 
                            <table>
                              <tr>
                                <td><div className="col btn btn-block bg-gradient-secondary"
                                  onClick={() => handlePuckUp(point.id,"qq")}
                                >Только Самовывоз</div></td>
                                <td><div className="col btn btn-block bg-gradient-primary">Обновить организацию</div></td>
                              </tr>
                              
                            </table>
                            
                            
                        </div>
                      </div>
                      )
                    })
                  }
                  

                
              </div>
             
          )
          }
      
        
      })
    }
    </> 
  )
}
export default OrganizationList
import { IPoint, ListOrganization } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganization } from "domains/useCase/organization/useCase.Organization"
import { FC } from "react"
import cn from "classnames";
import { CART_CHOICE } from "application/contstans/cart.const";

type IProps = {
  orgs:ListOrganization[]
}

const OrganizationList: FC<IProps> = ({ orgs }) => {
  const useCasePoints = adapterComponentUseCase(useOrganization,orgs)
  const {organizations} = useCasePoints.data
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
                      console.log(point.address.street,point.delivMetod);
                      const CN = cn("col btn btn-block", {
                        'btn-success':
                          (point.delivMetod === CART_CHOICE.PICKUP)
                          
                      })
                      return (
                        <div key={point.id} className="card-body">
                          
                          <div className="card-footer">
                           <h3 className="card-title">{point.address.street}</h3>
                            <br /> 
                            <hr />
                            <table>
                              <tr>
                                <td><div className={CN}
                                  onClick={() => handlePuckUp(
                                    point.id,
                                    point.delivMetod)}
                                >Только Самовывоз</div></td>
                                
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
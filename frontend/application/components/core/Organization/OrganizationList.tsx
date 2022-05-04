import { IPoint, ListOrganization } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganization } from "domains/useCase/organization/useCase.Organization"
import { FC } from "react"
import cn from "classnames";
import { CART_CHOICE } from "application/contstans/cart.const";

type IProps = {
  orgs:ListOrganization[]
}

const OrganizationList = () => {
  const useCasePoints = adapterComponentUseCase(useOrganization)
  const {organizations} = useCasePoints.data
  const {handlePuckUp,handleHiddenOrg} = useCasePoints.handlers


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
                      const CNdelivMetod = cn("col btn btn-block", {
                        'btn-success':
                          (point.delivMetod === CART_CHOICE.PICKUP)
                          
                      })
                      const CNhiddenMetod = cn("col btn btn-block", {'btn-success':point.isHidden})
                      return (
                        <div key={point.id} className="card-body">
                          
                          <div className="card-footer">
                           <h3 className="card-title">{point.address.street}</h3>
                            <br /> 
                            <hr />
                            <table>
                              <tr>
                                <td><div className={CNdelivMetod}
                                  onClick={() => handlePuckUp(
                                    point.id,
                                    point.delivMetod)}
                                >Только Самовывоз</div></td>
                                <td><div className={CNhiddenMetod}
                                  onClick={() => handleHiddenOrg(
                                    point.id,
                                    !point.isHidden)}
                                >Скрыть точку</div>
                                </td>
                                
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
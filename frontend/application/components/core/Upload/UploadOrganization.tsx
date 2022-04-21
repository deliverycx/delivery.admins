import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCaseUpload } from "domains/useCase/upload/useCase.Upload"

const UploadOrganization = () => {
  const useCaseUploads = adapterComponentUseCase(useCaseUpload)
  const { organizations } = useCaseUploads.data

  return (
  <>
    {
      organizations && 
        organizations.map((org: any, index: number) => {
          if (org) {
            return (
              <>
              <div key={index} className="card">
                <div className="card-header">
                  <h3 className="card-title">{org.city}</h3>

                  </div>
                
                  <div className="card-body">
                    <h3 className="card-title">Инфо</h3>
                    <br/>
                    <ul>
                      <li>id - {org.organization.guid }</li>
                      <li>телефон - {org.organization.phone }</li>
                      <li>улица - {org.organization.street }</li>
                      <li>время работы - {org.organization.workTime}</li>
                           
                    </ul>
                    <h3 className="card-title">Описание</h3>
                    <br/>
                    <ul>
                      <li>description - {org.info.description }</li>
                      <li>address - {org.info.address}</li>
                      <li>timezone - {org.info.timezone}</li>
                      <li>workTime - {org.info.workTime}</li>
                      
                           
                  </ul>
                </div>

                  <div className="card-footer">
                    <table>
                      <tr>
                        <td><div className="col btn btn-block bg-gradient-secondary">Скрыть организацию</div></td>
                        <td><div className="col btn btn-block bg-gradient-primary">Обновить организацию</div></td>
                      </tr>
                      
                    </table>
                    
                    
                </div>
              </div>
              </>
          )
          }
      
        
      })
    }
    </>  
  )
}
export default UploadOrganization
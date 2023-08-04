import { FC } from "react"

const OrganizationCounter:FC<{organization:any}> = ({organization})  =>{
	return (
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Счечик хинкалий</h3>
            </div>
            <div className="card-body">
						<div className="form-group">
							
								<div className="popBox_item col-3"> 
				            <label className="form-label">VK</label>
				            
				        </div>
						
							
						</div>
						<input type="submit" value="Сохранить"  className="btn btn-success"/>
              
            </div>

          </div>
	)
}
export default OrganizationCounter
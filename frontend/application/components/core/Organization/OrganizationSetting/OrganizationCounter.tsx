import { FC, useEffect, useState } from "react"
import RequestOrganizationCount from "servises/repository/Axios/Request/Request.OrganizationCount"
import { compareAsc, format } from 'date-fns'

const OrganizationCounter:FC<{organization:any}> = ({organization})  =>{
	const [counterHI,setCounterHi] = useState<any>(null)
	const [value,setValue] = useState<any>(0)

	const getCoutn = async () =>{
		try {
			const {data} = await RequestOrganizationCount.CRUDFabric.getBuOrg(organization.id)
			if(data){
				setCounterHi(data)
				setValue(data.coutn)
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(()=>{
		organization && getCoutn()
	},[organization])

	const handlerCouter = async () =>{
		try {
			const dates = format(new Date(), 'yyyy-MM-dd')
			await RequestOrganizationCount.findBuOrg(counterHI ? {...counterHI,coutn:value} : 
					{	
						organization:organization.id,
						date:dates,
						coutn:value
					}
				)
			getCoutn()
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Счечик хинкалий</h3>
            </div>
            <div className="card-body">
						<div className="form-group">
							
								
								<input type="number" value={value} onChange={e => setValue(e.target.value) } />
							
						</div>
						
						<button type="submit" className="btn btn-success" onClick={handlerCouter}>Сохранить</button>
              
            </div>

          </div>
	)
}
export default OrganizationCounter
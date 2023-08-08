import { FC, useEffect, useState } from "react"
import { format } from "date-fns";
import RequestOrganizationCount from "servises/repository/Axios/Request/Request.OrganizationCount"

const OrganizationCounter:FC<{organization:any}> = ({organization})  =>{
	const [cout,setCount] = useState('')

	const handlersetCount = async () =>{
		try {
			let body = {
				_id:'',
				organization:organization.id,
				coutn:cout,
				date:format(new Date(), "yyy-LL-dd")
			}
			if(cout){
				const {data} = await RequestOrganizationCount.getOraganizationCount(organization.id)
				body = {...body,_id:data._id}
			}
			await RequestOrganizationCount.setCounter(body)
		} catch (error) {
			console.log(error);
		}
	}

	const getCount = async () =>{
		try {
			const {data} = await RequestOrganizationCount.getOraganizationCount(organization.id)
			console.log(data);
			data && setCount(String(data.coutn))
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getCount()
	},[])


	return (
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Счечик хинкалий</h3>
            </div>
            <div className="card-body">
						<div className="form-group">
							
								<div className="popBox_item col-3"> 
				            
				            <input type="text" defaultValue={cout} onChange={e => setCount(e.target.value) } />
				        </div>
						
							
						</div>
						<button  className="btn btn-success" onClick={handlersetCount}>Сохранить</button>
						
              
            </div>

          </div>
	)
}
export default OrganizationCounter
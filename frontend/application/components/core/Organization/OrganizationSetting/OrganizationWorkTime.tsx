import Modal from "application/components/common/Modal/Modal"
import { debounce } from "application/helpers/helper";
import { useState } from 'react';
import { FC } from 'react';
import { RequestOrganization } from "servises/repository/Axios/Request";

const OrganizationWorkTime:FC<{organization:any,refresh:any}> = ({organization,refresh}) =>{
	const [modal,setModal] = useState(false)

	const handlerWork = debounce(async (index:number,event:any) =>{
		const target = event.target.value
		const arr = organization.workTime.length > 7 ? [...organization.workTime.slice(0, 6)]  : [...organization.workTime]
		arr.splice(index,1,target)
		try {
			console.log(arr);
			await RequestOrganization.organizationTime({idorganization:organization.id,worktime:arr})
			refresh(organization.id)
		} catch (error) {
			
		}
	},200)

	

	return(
		<>
			<button onClick={()=> setModal(true)}>Показать время</button>
			{
				modal &&
				<Modal setter={()=> setModal(false)}>
				<div className="card-body">
					<table>
						<tr>
							<td><span>Понедельник</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[0]} onChange={e => handlerWork(0,e)} className="form-control" />
								</div>
							</td>
						</tr>
						<tr>
							<td><span>Вторник</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[1]} onChange={e => handlerWork(1,e)} className="form-control" />
								</div>
							</td>
						</tr>
						<tr>
							<td><span>Среда</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[2]} onChange={e => handlerWork(2,e)} className="form-control" />
								</div>
							</td>
						</tr>
						<tr>
							<td><span>Четверг</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[3]} onChange={e => handlerWork(3,e)} className="form-control" />
								</div>
							</td>
						</tr>
						<tr>
							<td><span>Пятница</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[4]} onChange={e => handlerWork(4,e)} className="form-control" />
								</div>
							</td>
						</tr>
						<tr>
							<td><span>Суббота</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[5]} onChange={e => handlerWork(5,e)} className="form-control" />
								</div>
							</td>
						</tr>

						<tr>
							<td><span>Воскресенье</span></td>
							<td>
								<div className="form-group">
									<input type="text" name="link" defaultValue={organization.workTime[6]} onChange={e => handlerWork(6,e)} className="form-control" />
								</div>
							</td>
						</tr>
					</table>
				</div>	
				</Modal>
			}
			
		</>
	)
}
export default OrganizationWorkTime
import { useState, useEffect, FC } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"

const OrganuzationSocial:FC<{organization:any}> = ({organization}) =>{

	const [input,setInput] = useState<string>()
	const [social,setSocial] = useState<any>()
	const [like, setLike] = useState<string>()

	useEffect(()=>{
		getSocial(organization.id)
	},[organization.id])

	const getSocial = async (id:string) =>{
		try {
			const {data} = await RequestOrganization.socialBu(id)
			data.like && setLike(data.like)
			data.social && setSocial(data.social)
		} catch (error) {
			console.log(error);
		}

	}

	const onLike = async () => {
		try {
			const data = {
				idorganization:organization.id,
				like: input
			}
			await RequestOrganization.like(data)
		} catch (e) {
			console.log(e,'LIKE ERROR')
		}
	}

	const onSubmit = async () =>{
		try {
			const data = {
				idorganization:organization.id,
				social:{
					vk:input
				}
			}
			await RequestOrganization.social(data)
		} catch (error) {

		}

	}

	return(
		<div className="card card-primary">
			<div className="card-header">
				<h3 className="card-title">Соц сети</h3>
			</div>
			<div className="card-body">
				<div className="form-group">

					<div className="popBox_item col-3">
						<label className="form-label">VK</label>
						{
							social
								? <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue={social ? String(social.vk) : ' '} className="form-control" />
								: <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue="" className="form-control" />

						}
					</div>


				</div>
				<input type="submit" value="Сохранить" onClick={onSubmit} className="btn btn-success"/>

			</div>

			<div className="card-body">
				<div className="form-group">

					<div className="popBox_item col-3">
						<label className="form-label">LIKE</label>
						{
							social
								? <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue={like ? String(like) : ' '} className="form-control" />
								: <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue="" className="form-control" />

						}
					</div>


				</div>
				<input type="submit" value="Сохранить" onClick={onLike} className="btn btn-success"/>

			</div>
		</div>
	)
}
export default OrganuzationSocial
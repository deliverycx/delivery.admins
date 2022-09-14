import { IDisplayBanner } from "@type"
import { FC, useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"

type IProps = {
	idpage:string
	idorganization: string
}

const DisplayBannerItem: FC<IProps> = ({ idorganization,idpage }) => {
	const [organization,setOrganization] = useState<any>()

	useEffect(()=>{
		getOrganization(idorganization)
	},[idorganization])

	const getOrganization = async (id:string) =>{
		try {
			const {data}  = await RequestOrganization.getBu({idorganization:id})
			setOrganization(data)	
		} catch (error) {
			console.log(error);
		}
	}

	return (
			<>
			{
				organization &&
				<div className="card-footer">
						<a className="card-title" href={`/banners/display/${idpage}`}>{organization.address.street}</a>
				</div>
			}
			</>
			
	)
}
export default DisplayBannerItem
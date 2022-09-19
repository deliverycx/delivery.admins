import { IDisplayBanner } from "@type"
import { FC, useEffect, useState } from "react"
import { RequestDisplay } from "servises/repository/Axios/Request"

const OrganizationBanner:FC<{id:string}> = ({id}) => {
	const [banner,setBanner] = useState<IDisplayBanner | null>(null)

	useEffect(()=>{
		id && getBannerOrg(id)
	},[id])

	const getBannerOrg =  async (id:string) =>{
		try {
			const {data} = await RequestDisplay.CRUDFabric.getBuOrg(id)
			data && setBanner(data)
		} catch (error) {
			console.log(error);
		}
	}

	const createBannerOrg = async () =>{
		try {
			await RequestDisplay.CRUDFabric.create({organization:id})
			getBannerOrg(id)
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="card card-primary">
			<div className="card-header">
				<h3 className="card-title">Отображение организации в баннерах</h3>
			</div>
			<div className="card-body">
				{
					banner
						? <a href={`/banners/display/${banner._id}`} className="btn btn-success">добавить баннеры</a>
						: <button onClick={()=> createBannerOrg()} className="btn btn-success">добавить организацию в баннеры</button>
				}
				
				

			</div>

		</div>
	)
}
export default OrganizationBanner
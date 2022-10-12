import { IDisplayBanner } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useDisplayBannerListItem } from "domains/useCase/banners/useCase.DisplayBanner"
import { FC, useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"

type IProps = {
	idpage:string
	idorganization: string
}

const DisplayBannerItem: FC<IProps> = ({ idorganization,idpage }) => {
	const useCase = adapterComponentUseCase(useDisplayBannerListItem,idorganization)
	const {organization,city} = useCase.data

	return (
			<>
			{
				organization &&
				<div className="card-footer">
						<a className="card-title" href={`/banners/display/${idpage}`}>{organization.address.street} - <strong>({city.name})</strong> </a>
				</div>
			}
			</>
			
	)
}
export default DisplayBannerItem
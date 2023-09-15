import { imgRout } from 'application/helpers/imgInit';
import { useCallback, useState, useEffect } from 'react';
import { RequestOrganization, RequestOrganizationFilter } from 'servises/repository/Axios/Request';


export type IFilters = { name: string, images: [] }

export function useOrganizationFilter(this: any, organization: any) {
	const [file, setFile] = useState<any>()
	const [filters, setFilters] = useState<IFilters | null>()
	const [modal, setModal] = useState(false)

	const onSubmit = async (data: any) => {
		try {
			const formData = new FormData()
			for (let i = 0; i < file.length; i++) {
				formData.append('files', file[i])
			}
			formData.append('name', data.name)
			await RequestOrganizationFilter.CRUDFabric.create(formData)
			getAllFilters()
			setModal(false)
		} catch (error) {
			console.log(error);
		}
	}

	const imagesArr = useCallback((mass: string[]) => {
		return mass.map((val: string) => {
			return imgRout(val)
		})
	}, [])

	const getAllFilters = async () => {
		try {
			const { data } = await RequestOrganizationFilter.CRUDFabric.getAll('')
			data && setFilters(data)
		} catch (error) {
			console.log(error);
		}
	}



	useEffect(() => {
		getAllFilters()
	}, [])


	const handlerAddfilter = async (id: any) => {
		try {
			let mass = Array.isArray(organization.filters) ? [...organization.filters] : []
			const index = mass.map((e:any) => e._id).indexOf(id._id)
				if(index !== -1){
					mass.splice(index, 1)
				}else{
					mass.push(id)
				}

			await RequestOrganization.addfilter({
				idorganization: organization.id,
				filterlist: mass
			})



			/*
			await RequestOrganization.addfilter({
				idorganization:organization.id,
				filterlist:id
			})
			*/
		} catch (error) {

		}
	}




	this.data({
		file,
		imagesArr,
		filters,
		modal
	})
	this.handlers({
		setModal,
		setFile,
		onSubmit,
		handlerAddfilter
	})
	this.status({

	})
}
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"
import { ISocial, ListOrganization } from "@type";

export function  useOrganizationSetting(this: any){
	const router = useRouter()
	const slideId = router.query.id as string

	const [input,setInput] = useState<string>()
	const [social,setSocial] = useState<any>()
	const [organization,setOrganization] = useState<any>()

	useEffect(()=>{
		if(slideId){
			getSocial(slideId)
			getOrgBu(slideId)
		}

	},[slideId])

	const getSocial = async (id:string) =>{
		try {
			const {data} = await RequestOrganization.socialBu(id)
			setSocial(data)
		} catch (error) {
			console.log(error);
		}
		
	}

	const getOrgBu = async (id:string) =>{
		try {
			const {data} = await RequestOrganization.getBu({idorganization: id})
			setOrganization(data)
		} catch (error) {
			console.log(error);
		}
		
	}


	const onSubmit = async () =>{
		try {
				const data = {
				idorganization:slideId,
				social:{
					vk:input
				}
			}
			await RequestOrganization.social(data)
		} catch (error) {
			
		}
		
	}

	const deliteOrganization = async (id:string) =>{
		try {
			const {data} = await RequestOrganization.organizationDelite({id})
			router.push('/organization/')
		} catch (error) {
			
		}
	}


	const handleReserveTable = async (event:any) =>{
		const value = event.target.value
		const tobol = value === 'true' ? true : false
		await RequestOrganization.reserveTable({
			idorganization: slideId,
			reservetable:tobol
		})
		getOrgBu(slideId)
	}


	

	this.data({
		social,
		slideId,
		organization
  })
  this.handlers({
		setInput,
		onSubmit,
		handleReserveTable,
		getOrgBu,
		deliteOrganization
  })
  this.status({
    
  })
}
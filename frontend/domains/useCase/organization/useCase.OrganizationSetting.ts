import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"
import { ISocial, ListOrganization } from "@type";

export function  useOrganizationSetting(this: any){
	const router = useRouter()
	const slideId = router.query.id as string

	const [input,setInput] = useState<string>()
	const [social,setSocial] = useState<any>()

	useEffect(()=>{
		
		slideId &&	getSocial()
	},[])


	const getSocial = async () =>{
		try {
			const {data} = await RequestOrganization.socialBu(slideId)
			setSocial(data)
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

	this.data({
		social
  })
  this.handlers({
		setInput,
		onSubmit
  })
  this.status({
    
  })
}
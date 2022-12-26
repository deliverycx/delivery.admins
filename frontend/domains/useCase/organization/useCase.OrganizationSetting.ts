import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"
import { IOrganization, ISocial, ListOrganization } from "@type";
import { useFormik, FormikProvider } from "formik";

export function  useOrganizationSetting(this: any){
	const router = useRouter()
	const slideId = router.query.id as string

	const [input,setInput] = useState<string>()
	const [social,setSocial] = useState<any>()
	const [organization,setOrganization] = useState<any>(null)

	useEffect(()=>{
		if(slideId){
			getSocial(slideId)
			getOrgBu()
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

	const getOrgBu = async () =>{
		try {
			const {data} = await RequestOrganization.getBu({idorganization: slideId})
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

	const handleHiddenOrg = async (idorganization: string,isHidden:boolean) => {
    await RequestOrganization.hiddenOrganization({ idorganization, isHidden })
    await getOrgBu()
  }


	const handleReserveTable = async (event:any) =>{
		const value = event.target.value
		const tobol = value === 'true' ? true : false
		await RequestOrganization.reserveTable({
			idorganization: slideId,
			reservetable:tobol
		})
		getOrgBu()
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
		deliteOrganization,
		handleHiddenOrg
  })
  this.status({
    
  })
}


export function  useOrganizationSettingFrom(this: any,organization:IOrganization){

	const initialValues = {
		phone:organization.phone,
		adress:organization.address.street,
		longitude:organization.address.longitude,
		latitude:organization.address.latitude
	}

	const handlerOrgSetting = async (values:typeof initialValues) =>{
		await RequestOrganization.setSetting({
			idorganization:organization.id,
			...values
		})
	}


	const formik = useFormik({
    initialValues,
    onSubmit: async (values, meta) => {
      await handlerOrgSetting(values)

    },
  });




	this.data({
		formik
  })
  this.handlers({
		
  })
  this.status({
    
  })
}
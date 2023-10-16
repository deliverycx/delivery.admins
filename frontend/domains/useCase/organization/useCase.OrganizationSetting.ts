import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"
import {IFoodsArray, IOrganization, ISocial, ListOrganization} from "@type";
import { useFormik, FormikProvider } from "formik";
import {requestOrganizationFoods} from "../../../servises/repository/Axios/Request/Request.OrganizationFoods";

export function  useOrganizationSetting(this: any){
	const router = useRouter()
	const slideId = router.query.id as string

	const [input,setInput] = useState<string>()
	const [social,setSocial] = useState<any>()
	const [organization,setOrganization] = useState<any>(null)
	const [foods, setFoods] = useState<IFoodsArray>()

	useEffect(()=>{
		if(slideId){
			getOrgBu()
			getOrganizationFoods()
		}

	},[slideId])


	const getOrgBu = async () =>{
		try {
			const {data} = await RequestOrganization.getBu({idorganization: slideId})
			setOrganization(data)
		} catch (error) {
			console.log(error);
		}
	}

	const getOrganizationFoods = async () => {
		try {
			const { data } = await requestOrganizationFoods.getAllFoods({organizationId: slideId})
			setFoods(data)
		} catch (e) {
			console.log(e)
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

	const checkOrganization = async (idorganization: string) =>{
		try {
			await RequestOrganization.checkOrganization({idorganization})
		} catch (error) {
			
		}
	}




	

	this.data({
		social,
		slideId,
		organization,
		foods
  })
  this.handlers({
		setInput,
		getOrgBu,
		deliteOrganization,
		handleHiddenOrg,
		checkOrganization
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
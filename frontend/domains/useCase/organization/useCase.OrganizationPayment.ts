import { IOrganizationPayment, IPayMaster, IRecvisites } from "@type"
import { useFromsCRUD } from "application/hooks/useFormsCRUD"
import { requestOrganizationPayment, requestRecvisitesPayment } from "servises/repository/Axios/Request/Request.OrganizationPayment"
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export function useOrganizationPayment(this: any,id:string) {
	const [info,setInfo] = useState<IPayMaster | null>(null)
	useEffect(()=>{
		getBu()

	},[id])

	const getBu = async () =>{
		try {
			const {data} = await requestOrganizationPayment.findBuOrg({organization:id})
			data && setInfo(data)
		} catch (error) {
			console.log(error);
		}
	}
	const handlerSwitchPayment = async (active:boolean) =>{
		try {
			if(info){
				await requestOrganizationPayment.swtchPamyMent(info._id,{isActive:active})
				getBu()
			}
		} catch (error) {
			console.log(error);
		}
	}
	

  
  this.data({
    info
  })
  this.handlers({
    handlerSwitchPayment
  })
  this.status({
    
  })
}

export function useOrganizationPayMaster(this: any,id:string) {
	const router = useRouter()
	const initState = {
			token:'',
			merchantId:''
		}

	const [modal,setModal] = useState<boolean>()
	const [info,setInfo] = useState<IPayMaster | null>(null)
	
	useEffect(()=>{
		getBu()

	},[id])
	
	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();

	const onSubmit = async (data:any) => {
    try {
			!info
					? await requestOrganizationPayment.CRUDFabric.create({...data,organization:id})
					: await requestOrganizationPayment.CRUDFabric.edit({...data,organization:id},info._id)
			setModal(false)
			router.reload()
    } catch (error) {
      console.log(error);
    }
  }

	const getBu = async () =>{
		try {
			const {data} = await requestOrganizationPayment.findBuOrg({organization:id})
			data && setInfo(data)
		} catch (error) {
			console.log(error);
		}
	}

	


  this.data({
    modal,
		info
  })
  this.handlers({
    setModal,
		handleSubmit,
		register,
		onSubmit,
  })
  this.status({
    
  })
}

export function useOrganizationRecvisites(this: any,id:string) {
	const router = useRouter()
	const initState = {
			ogrn:'',
			inn:'',
			name:''
		}

	const [modal,setModal] = useState<boolean>()
	const [info,setInfo] = useState<IRecvisites | null>(null)
	
	useEffect(()=>{
		getBu()

	},[id])
	
	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();

	const onSubmit = async (data:any) => {
    try {
			!info
					? await requestRecvisitesPayment.CRUDFabric.create({...data,organization:id})
					: await requestRecvisitesPayment.CRUDFabric.edit({...data,organization:id},info._id)
			setModal(false)
			router.reload()
    } catch (error) {
      console.log(error);
    }
  }

	const getBu = async () =>{
		try {
			const {data} = await requestRecvisitesPayment.findBuOrg({organization:id})
			data && setInfo(data)
		} catch (error) {
			console.log(error);
		}
	}

	


  this.data({
    modal,
		info
  })
  this.handlers({
    setModal,
		handleSubmit,
		register,
		onSubmit,
  })
  this.status({
    
  })
}
import { IOrganizationPayment, IPayMaster, IRecvisites } from "@type"
import { useFromsCRUD } from "application/hooks/useFormsCRUD"
import { requestOrganizationPayment, requestRecvisitesPayment } from "servises/repository/Axios/Request/Request.OrganizationPayment"
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export function useOrganizationPayment(this: any,id:string) {
	const [oragPayInfo,setOragPayInfo] = useState<IPayMaster | null>(null)
	const [payInfoModal,setPayInfoModal] = useState<{modal:boolean,idpay:string}>({
		modal:false,
		idpay:''
	})
	useEffect(()=>{
		getBu()

	},[id])

	const getBu = async () =>{
		try {
			const {data} = await requestOrganizationPayment.findBuOrg({organization:id})
			data && setOragPayInfo(data)
		} catch (error) {
			console.log(error);
		}
	}
	const handlerSwitchPayment = async (active:boolean) =>{
		try {
			if(oragPayInfo){
				await requestOrganizationPayment.swtchPamyMent(oragPayInfo._id,{isActive:active})
				getBu()
			}
		} catch (error) {
			console.log(error);
		}
	}

	const delitePay = async (id:string) =>{
		try {
			await requestOrganizationPayment.CRUDFabric.delet(id)
			getBu()
		} catch (error) {
			console.log(error);
		}
	}
	

  
  this.data({
    oragPayInfo,
		payInfoModal
  })
  this.handlers({
    handlerSwitchPayment,
		setPayInfoModal,
		delitePay
  })
  this.status({
    
  })
}

export function useOrganizationPayMaster(this: any,{paymodal,id}:any) {
	const router = useRouter()
	const initState = {
			name:'',
			token:'',
			merchantId:'',
			typemagaz:''
		}

	const [modal,setModal] = useState<boolean>()
	const [info,setInfo] = useState<IPayMaster | null>(null)



	
	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();
	
	const onSubmit = async (data:any) => {
    try {
			/*
			!paymodal.pay
					? await requestOrganizationPayment.CRUDFabric.create({...data,organization:id})
					: await requestOrganizationPayment.CRUDFabric.edit({...data,organization:id},paymodal.pay._id)
			*/		
			await requestOrganizationPayment.CRUDFabric.create({...data,organization:id})		
			setModal(false)
			router.reload()
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
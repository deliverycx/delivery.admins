import { useRouter } from "next/router"
import { RequestBanners, RequestDisplay, RequestOrganization } from "servises/repository/Axios/Request"
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useFromsCRUD } from "application/hooks/useFormsCRUD";
import { IDisplayBanner, IGroopsBanner, IPoint } from "@type";
import RequestGroops from "servises/repository/Axios/Request/Request.Groops";

export function useDisplayBanner(this: any) {
	const [display,setDisplay] = useState()
	const [groops,setGroops] = useState()
	const [filter,setFilter] = useState<string[]>([])

	useEffect(()=>{
		getAllGroops()
		getAllDisplay()
	},[])

	useEffect(()=>{
		filter.length > 0 ? requestFilter() : getAllDisplay()
	},[filter])

	const getAllDisplay = async () =>{
		try {
			const {data} = await RequestDisplay.CRUDFabric.getAll()
			console.log(data);
			setDisplay(data)
		} catch (error) {
			console.log(error);
		}
	}

	const getAllGroops = async () =>{
		try {
			const {data} = await RequestGroops.CRUDFabric.getAll()
			setGroops(data)
		} catch (error) {
			console.log(error);
		}
	}

	const requestFilter = async () =>{
		try {
			const {data} = await RequestDisplay.filterBu({filter})
			setDisplay(data)
		} catch (error) {
			console.log(error);
		}
		
	}


	this.data({
		display,
		groops,
		filter
  })
  this.handlers({
		setFilter
  })
}


export function useDisplayBannerFrom(this: any) {
	const router = useRouter()
	const pageid = router.query.id as string

	const [organizations,setOrganizations] = useState<any>()
	const [groops,setGroops] = useState<IGroopsBanner>()
	const [status,setStatus] = useState(false)
	const [delite,setDelite] = useState(false)


	useEffect(()=>{
		fetchGroopsBanner()
	},[pageid])

	useEffect(()=>{
		let timer:ReturnType<typeof setTimeout>
		if(status){
			timer = setTimeout(()=>{
				setStatus(false)
			},3000)
		}
		return () => clearTimeout(timer)
	},[status])

	const initState = {
		organization:''
	}

	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();
	const fomrdata = (value:typeof initState) => value
	const [data,{setData,getAll,getBu}] = useFromsCRUD<IDisplayBanner>(fomrdata,RequestDisplay.CRUDFabric)


	const fetchGroopsBanner = async () => {
    try {
      const { data } = await RequestGroops.CRUDFabric.getAll()
			setGroops(data)
    } catch (error) {
      console.log(error)
    }
  }

	const handlSelectOrg = (value:string) =>{
		setValue('organization',value)
	}

	const addBuField = async (banner:string,field:string) =>{
		try {
			const { data } = await RequestDisplay.addBuField({field,banner},pageid)
			getBu(pageid)
		} catch (error) {
			console.log(error);
		}
	}
	const deleteBanner = async (banner:string,field:string) =>{
		try {
			const { data } = await RequestDisplay.deleteBuField({field,banner},pageid)
			getBu(pageid)
		} catch (error) {
			console.log(error);
		}
	}

	const onSubmit = async (data:any) => {
    try {
			pageid
					? await RequestDisplay.CRUDFabric.create(fomrdata(data))
					: await RequestDisplay.CRUDFabric.edit(fomrdata(data),pageid)
			setStatus(true)
    } catch (error) {
      console.log(error);
    }
  }

	const onDelet = async (id:string) => {
    try {
      await RequestDisplay.CRUDFabric.delet(id)
			router.push('/banners/display/')
    } catch (error) {
      console.log(error);
    }
  }

	this.data({
		organizations,
		data,
		pageid,
		groops
  })
  this.handlers({
		handlSelectOrg,
		register,
		onSubmit,
		handleSubmit,
		router,
		onDelet,
		addBuField,
		deleteBanner,
		setStatus,
		setDelite
  })
  this.status({
    status,
		delite
  })
}


export function useDisplayBannerListItem(this: any,idorganization:string) {
	const [organization,setOrganization] = useState<any>()
	const [city,setСity] = useState<any>()

	useEffect(()=>{
		getOrganization(idorganization)
	},[idorganization])

	const getOrganization = async (id:string) =>{
		try {
			const {data:org}  = await RequestOrganization.getBu({idorganization:id})
			const {data:citys} = await RequestOrganization.getCityBu(org.city)
			setOrganization(org)	
			setСity(citys)
		} catch (error) {
			console.log(error);
		}
	}
	
	this.data({
		organization,
		city
  })
}
import { CART_CHOICE } from "application/contstans/cart.const"
import { useState, useEffect } from 'react';
import { ListOrganization } from "@type";
import { RequestOrganization } from "servises/repository/Axios/Request";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";


export function useOrganization(this: any,reset:boolean = false) {
  const [organizations, setOrganizations] = useState<any>()
	const router = useRouter()

  const fetchOrg = async () => {
    try {
      const { data } = await RequestOrganization.getAll()
      setOrganizations(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchOrg()
  }, [])
  
  const handleAllOrg = async () => {
    const {data} = await RequestOrganization.getAll()
    setOrganizations(data)
		reset && router.reload()
  }
  
  const handlePuckUp = async (idorganization: string, metod: string | null) => {
    try {
      
      await RequestOrganization.switchDelivMetod({ idorganization, delivmetod:metod })
      await handleAllOrg()
    } catch (error) {
      console.log(error)
    }
  }

  const handleHiddenOrg = async (idorganization: string,isHidden:boolean) => {
    await RequestOrganization.hiddenOrganization({ idorganization, isHidden })
    await handleAllOrg()
  }

	const handleHiddenCity = async (idorganization: string,isHidden:boolean) => {
    await RequestOrganization.hiddenCity({ idorganization, isHidden })
    await handleAllOrg()
  }

  this.data({
    organizations
  })
  this.handlers({
    handlePuckUp,
    handleHiddenOrg,
		handleHiddenCity
  })
  this.status({
    
  })
}


export function useCityAdd(this: any) {
	const router = useRouter()

	const initState = {
		name:'',
	}

	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();
	const fomrdata = (value:typeof initState) => value

	const onSubmit = async (org:any) => {
    try {
			console.log(org);
			const {data} = await RequestOrganization.CityAdd(org) 
			router.push('/organization/')
    } catch (error) {
      console.log(error);
    }
  }

	this.data({
		router
  })
  this.handlers({
		handleSubmit,
		onSubmit,
		register
  })
  this.status({
    
  })
}



export function useOrganizationAdd(this: any) {
	const router = useRouter()

	const [organizations, setOrganizations] = useState<any>()

  const fetchOrg = async () => {
    try {
      const { data } = await RequestOrganization.getAll()
      setOrganizations(data)
    } catch (error) {
      console.log(error)
    }
  }

	const initState = {
		street:'',
		longitude:'',
		latitude:'',
		phone:'',
		workTime:'',
		city:''
	}

	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();
	const fomrdata = (value:typeof initState) => value

	const onSubmit = async (org:any) => {
    try {
			console.log(org);
			const body = {
				address:{
					street:org.street,
					longitude:org.longitude,
					latitude:org.latitude
				},
				city:org.city,
				phone:org.phone,
				workTime:'10:00-22:00',
				delivMetod:CART_CHOICE.NOWORK,
				isHidden:true
			}
			const {data} = await RequestOrganization.organizationAdd(body) 
			router.push('/organization/')
    } catch (error) {
      console.log(error);
    }
  }

	useEffect(()=>{
		fetchOrg()
	},[])

	useEffect(()=>{
		organizations &&
		setValue('city',organizations[0]._id)
	},[organizations])


	const handlerSelectCity = (e:any) =>{
		setValue('city',e.target.value)
	}


	this.data({
		router,
		organizations
  })
  this.handlers({
		handleSubmit,
		onSubmit,
		register,
		handlerSelectCity
  })
  this.status({
    
  })
}
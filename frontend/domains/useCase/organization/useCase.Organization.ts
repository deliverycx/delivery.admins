import { CART_CHOICE } from "application/contstans/cart.const"
import { useState, useEffect } from 'react';
import { ListOrganization } from "@type";
import { RequestOrganization } from "servises/repository/Axios/Request";
import { useRouter } from 'next/router';


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
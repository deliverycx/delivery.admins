import { CART_CHOICE } from "application/contstans/cart.const"
import { useState, useEffect } from 'react';
import { ListOrganization } from "@type";
import { RequestOrganization } from "servises/repository/Axios/Request";


export function useOrganization(this: any) {
  const [organizations, setOrganizations] = useState<any>()

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
  }
  
  const handlePuckUp = async (idorganization: string, metod: string | null) => {
    try {
      const delivmetod = metod === CART_CHOICE.PICKUP ? null : CART_CHOICE.PICKUP
      await RequestOrganization.switchDelivMetod({ idorganization, delivmetod })
      await handleAllOrg()
    } catch (error) {
      console.log(error)
    }
  }

  const handleHiddenOrg = async (idorganization: string,isHidden:boolean) => {
    await RequestOrganization.hiddenOrganization({ idorganization, isHidden })
    await handleAllOrg()
  }

  this.data({
    organizations
  })
  this.handlers({
    handlePuckUp,
    handleHiddenOrg
  })
  this.status({
    
  })
}
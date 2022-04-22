import { CART_CHOICE } from "application/contstans/cart.const"
import RequestOrganization from "servises/repository/Axios/Request/Request.Organization"
import { useState, useEffect } from 'react';
import { ListOrganization } from "@type";


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
  },[])
  
  const handlePuckUp = async (idorganization: string, metod: string | null) => {
    try {
      const delivmetod = metod === CART_CHOICE.PICKUP ? null : CART_CHOICE.PICKUP
      await RequestOrganization.switchDelivMetod({ idorganization, delivmetod })
      const {data} = await RequestOrganization.getAll()
      setOrganizations(data)
    } catch (error) {
      console.log(error)
    }
  }

  this.data({
    organizations
  })
  this.handlers({
    handlePuckUp
  })
  this.status({
    
  })
}
import { RequestUpload } from "servises/repository/Axios/Request"
import { useEffect, useState } from 'react';

export function useCaseUpload(this: any) {
  const [organizations,setOrganizations] = useState<any>(null)

  const uploadRequest = async () => {
    try {
      const { data } = await RequestUpload.PoolingOrganization()
      
      setOrganizations(data.result)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    uploadRequest()
  },[])


  this.data({
    organizations
  })
  this.handlers({
    
  })
  this.status({
    
  })
}
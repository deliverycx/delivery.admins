import { RequestUpload } from "servises/repository/Axios/Request"
import { useEffect, useState } from 'react';

export function useCaseUpload(this: any) {
  const [organizations,setOrganizations] = useState<any>(null)
	const [organizationInfo,setOrganizationInfo] = useState<any>(null)
	const [organizationStatus,setOrganizationStatus] = useState<any>(null)
	const [urlhooks,setUrlhooks] = useState<string>('https://хинкалыч.рф/api/webhook/test')
	const [loading,setLoading] = useState<boolean>(false)
	const [revision,setRevision] = useState<any>(false)

  const uploadRequest = async () => {
    try {
      const { data } = await RequestUpload.getIIkkoOrganizations()
      
      setOrganizations(data)
      
    } catch (error) {
      console.log(error)
    }
  }

	const getIIkkoInfoOrg = async (id:string) =>{
		try {
			const { data } = await RequestUpload.getIIkkoOrganizationInfo(id)
			setOrganizationInfo(data)
		} catch (error) {
			setOrganizationInfo(false)
		}
		
		
	}

	const poolingOrganization = async (id:string) =>{
		try {
			setLoading(true)
			const { data } = await RequestUpload.poolingOrganization(id)
			uploadRequest()
			setLoading(false)
		} catch (error) {
			
		}
	}

	const poolingNomenclature = async (id:string) =>{
		try {
			const { data } = await RequestUpload.poolingMenu(id)
			data && setRevision(data)
		} catch (error) {
			
		}
	}

	const getMenu = async (id:string) =>{
		const { data } = await RequestUpload.getMenu(id)
	}

  useEffect(() => {
    uploadRequest()
  },[])

	const updateIikkoHooks = async (id:string) =>{
		try {
			 await RequestUpload.ikkowebhooks({
				organization:id,
				localhoste:urlhooks
			})
		} catch (error) {
			
		}
	}


  this.data({
    organizations,
		organizationInfo,
		urlhooks,
		loading,
		revision
  })
  this.handlers({
    getIIkkoInfoOrg,
		poolingOrganization,
		poolingNomenclature,
		setUrlhooks,
		updateIikkoHooks,
		getMenu
  })
  this.status({
    
  })
}
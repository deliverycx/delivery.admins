import RequestOrganizationStatus from "servises/repository/Axios/Request/Request.OrganizationStatus"
import { useState } from 'react';
import { IOrganizationStatus } from "@type";
import { useEffect } from 'react';
import { RequestOrganization } from "servises/repository/Axios/Request";
import { useRouter } from "next/router";

export function  useOrganizationStatus(this: any,organization:string){
	const router = useRouter()
	const [organizationStatus,setOrganizationStatus] = useState<IOrganizationStatus | null>(null)

	const getStatus = async () =>{
		try {
			const {data} = await RequestOrganizationStatus.getTables(organization)
			data && setOrganizationStatus(data)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		organization && getStatus()
	},[organization])


	const swtchStatus = async  (statusMetod:string,metod:string[] | string) =>{
		try {
			const body = {
				organization,
				statusMetod,
				metod
			}
			await RequestOrganizationStatus.update(body)
			getStatus()
		} catch (error) {
			
		}
	}

	this.data({
		organizationStatus
  })
  this.handlers({
		swtchStatus
  })
  this.status({
    
  })
}
import { RequestOrganizationTables } from "servises/repository/Axios/Request"
import { useEffect,useState } from 'react';
import { useRouter } from "next/router";

export function useOrganizationTables(this: any,idorganization:string) {
	const router = useRouter()
	const [table,setTable] = useState<any>(null)
	const [organizationTable,setOrganizationTable] = useState<any>(null)

	useEffect(()=>{
		getIikkoTables()
		getOrgTables()
	},[])

	const getIikkoTables = async () =>{
		try {
			const {data} = await RequestOrganizationTables.getTables(idorganization)
			console.log('TABLES', data)
			setTable(data)
		} catch (error) {
			
		}
	}

	const getOrgTables = async () =>{
		try {
			const {data} = await RequestOrganizationTables.CRUDFabric.getBuAllOrg(idorganization)
			if(data && data.length !== 0){
				setOrganizationTable(data)
			}else{
				setOrganizationTable(null)
			}
			
		} catch (error) {
			
		}
	}

	const deliteTables = async (id:string) =>{
		try {
			
			const {data} = await RequestOrganizationTables.CRUDFabric.delet(id)
			console.log('delet',id,data);
			getOrgTables()
			
		} catch (error) {
			
		}
	}

	


	const handlerAddTable = async (index:number) =>{
		const tabl = table[index]
		const body = {
			organization:idorganization,
			idsection:tabl.id,
			name:tabl.name,
			tables:tabl.tables
		}

		try {
			const {data} = await RequestOrganizationTables.addTable(body)
			getOrgTables()
		} catch (error) {
			
		}
	}

	this.data({
    table,
		organizationTable
  })
  this.handlers({
    handlerAddTable,
		deliteTables
  })
  this.status({
    
  })
}
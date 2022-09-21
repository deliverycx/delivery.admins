import { Tfile } from "@type"
import { useRouter } from "next/router"
import { Dispatch, useEffect, useState } from "react"
import { CRUDFabric } from "servises/repository/Axios/Fabric/CRUD.fabric"

type Tfomrdata = (data:any,fomrdata?:any) => void
type handler<T> = {
	onSubmit:(data:any) => void
	getBu:(id:string) => void
	getAll:() => void
	onDelet:(id:string) => void
	setData:Dispatch<T>
}

export const useFromsCRUD = 
	<T>
	(fomrdata:Tfomrdata,request:CRUDFabric,id?:string,filee?:Tfile) 
	: [T | undefined,handler<T>] =>{
	const router = useRouter()
	const pageid = id ? id : router.query.id as string
	const [data,setData] = useState<T>()

	
	useEffect(()=>{
		if(pageid){
			getBu(pageid)
		}else{
			getAll()
		}

	},[pageid])


	const onSubmit = async (data:any) => {
    try {
			if(filee){
				const formData = new FormData()
	      fomrdata(data,formData)
				!pageid
					? await request.create(formData)
					: await request.edit(formData,pageid)
				
			}else{
				!pageid
					? await request.create(fomrdata(data))
					: await request.edit(fomrdata(data),pageid)
			}
      
			router.back()
    } catch (error) {
      console.log(error);
    }
  }

	const getBu = async (id:string) =>{
		try {
			const {data} = await request.getBu(id)
			setData(data)
		} catch (error) {
			console.log(error);
		}
	}

	const getAll = async () =>{
		try {
			const {data} = await request.getAll()
			setData(data)
		} catch (error) {
			console.log(error);
		}
	}

	const onDelet = async (id:string) => {
    try {
      await request.delet(id)
			router.back()
    } catch (error) {
      console.log(error);
    }
  }

	return [
		data,
		{
    	onSubmit,
			getBu,
			getAll,
			onDelet,
			setData
  	}
	] 
}
import { IGroopsBanner } from '@type';
import { useFromsCRUD } from 'application/hooks/useFormsCRUD';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RequestGroops from 'servises/repository/Axios/Request/Request.Groops';

export function useGroopsBanner(this: any) {
	const router = useRouter()
	const pageid = router.query.id as string

	const initState = {
		name:'',
		category:''
	}

	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();
	const fomrdata = (value:typeof initState) => value
	const [data,{onSubmit,onDelet,setData,getAll}] = useFromsCRUD<IGroopsBanner>(fomrdata,RequestGroops.CRUDFabric)

	const addBanner = async (idbanner:string,idgroop:string) => {
		try {
			const {data} = await RequestGroops.addGroopsBanner({id:idgroop,banners:idbanner})
			getAll()
			//setData(data)
		} catch (error) {
			console.log(error);
		}
	}

	const deleteBanner = async (idbanner:string,idgroop:string) => {
		try {
			const {data} = await RequestGroops.deletGroopsBanner({id:idgroop,banners:idbanner})
			//setData(data)
			getAll()
		} catch (error) {
			console.log(error);
		}
	}


	this.data({
		data,
		pageid
  })
  this.handlers({
		register,
		onSubmit,
		handleSubmit,
		router,
		addBanner,
		deleteBanner,
		onDelet
  })
  this.status({
    
  })
}
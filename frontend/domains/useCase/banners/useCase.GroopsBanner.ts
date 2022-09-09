import { IGroopsBanner } from '@type';
import { useFromsCRUD } from 'application/hooks/useFormsCRUD';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import RequestGroops from 'servises/repository/Axios/Request/Request.Groops';

export function useGroopsBanner(this: any) {
	const router = useRouter()
	const pageid = router.query.id as string

	const initState = {
		name:'',
		category:''
	}

	const { register, handleSubmit, watch } = useForm<typeof initState>();
	const fomrdata = (data:typeof initState) => data
	const [data,{onSubmit}] = useFromsCRUD<IGroopsBanner>(fomrdata,RequestGroops.CRUDFabric)
	console.log(data && data);

	const addBanner = async (idbanner:string) => {
		try {
			const {data} = await RequestGroops.addGroopsBanner({id:pageid,banners:idbanner})
			console.log(data);
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
		addBanner
  })
  this.status({
    
  })
}
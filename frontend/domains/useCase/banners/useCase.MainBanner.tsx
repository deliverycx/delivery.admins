import { Tfile } from '@type';
import { useFroms } from 'application/hooks/useForms';
import { useCallback, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestBanners, RequestOrganization } from 'servises/repository/Axios/Request';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { imgRout } from 'application/helpers/imgInit';
import { BannerReducer,initialStateBanner,ReducerActionTypePoints } from 'application/reducers/BannerReducer';

export function useMainBanner(this: any) {
	const [banners,setBanners] = useState<any[] | null>()
	const [organizations, setOrganizations] = useState<any>()
	const [selectOrg, setSelectOrg] = useState<string>('all')

	useEffect(()=>{
		getBuOrg()
		fetchOrg()
	},[selectOrg])


	const getBuOrg = async () =>{
		try {
			const result = await RequestBanners.getAll(selectOrg)
			console.log(result.data);
			if(result.status === 200){
				setBanners(result.data)
			}else{
				setBanners(null)
			}
		} catch (error) {
			setBanners(null)
		}
		
	}
	const fetchOrg = async () => {
    try {
      const { data } = await RequestOrganization.getAll()
      setOrganizations(data)
    } catch (error) {
      console.log(error)
    }
  }
	const setBuImages = async (id:string,data:[]) =>{
		try {
			const result = await RequestBanners.setImages(id,{images:data})

			if(result.status === 200){
				setBanners(result.data)
			}else{
				setBanners(null)
			}
		} catch (error) {
			setBanners(null)
		}
		
	}

	
	

	this.data({
		banners,
		organizations
  })
  this.handlers({
		setSelectOrg,
		setBuImages
  })
  this.status({
    
  })
}

export function useMainBannerForm(this: any) {
	const router = useRouter()
	const slideId = router.query.id as string

	const { register, handleSubmit, watch } = useForm<{img:Tfile}>();

	const [stateBanners, dispatchBanners] = useReducer(
    BannerReducer,
    initialStateBanner
  );


	useEffect(()=>{
		slideId && getBu(slideId)
		fetchOrg()
	},[slideId])


	const getBu = async (id:string) =>{
		try {
			
			const result = await RequestBanners.getBu(id)
			console.log('data',result);
			if(result.status === 200){
				dispatchBanners({
					type: ReducerActionTypePoints.setBanners,
					payload: result.data
				});
				if(id){
					dispatchBanners({
						type: ReducerActionTypePoints.setSelectOrg,
						payload: result.data.organization
					});
					dispatchBanners({
						type: ReducerActionTypePoints.setUrl,
						payload: result.data.url
					});
				}
				

			}else{
				dispatchBanners({
					type: ReducerActionTypePoints.setBanners,
					payload: null
				});
			}
		} catch (error) {
			dispatchBanners({
				type: ReducerActionTypePoints.setBanners,
				payload: null
			});
		}
		
	}
	const fetchOrg = async () => {
    try {
      const { data } = await RequestOrganization.getAll()

			dispatchBanners({
				type: ReducerActionTypePoints.setOrganizations,
				payload: data
			});
    } catch (error) {
      console.log(error)
    }
  }

	const fomrdata = (formData:any,data:any) => {
		if (stateBanners.filee) {
      for (let i = 0; i < stateBanners.filee.length; i++) {
        formData.append('files', stateBanners.filee[i])
      }
    }
		if (stateBanners.smallFilee) {
      for (let i = 0; i < stateBanners.smallFilee.length; i++) {
        formData.append('smallfilee', stateBanners.smallFilee[i])
      }
    }
		formData.append('organization', stateBanners.selectOrg)
		formData.append('url', stateBanners.url)
		formData.append('order', data.order || stateBanners.banners.order)

	}


	const onSubmit = async (data:any) => {
    try {
			console.log(data);
      const formData = new FormData()
      fomrdata(formData,data)
			!slideId 
						? await RequestBanners.create(formData)
						: await RequestBanners.edit(formData,slideId)
			router.push('/banners')
    } catch (error) {
      console.log(error);
    }
  }

	const onDelet = async (id:string) => {
    try {
      await RequestBanners.delet(id)
			router.push('/banners')
    } catch (error) {
      console.log(error);
    }
  }

	const handlSelectOrg = async (org:string) =>{
		dispatchBanners({
			type: ReducerActionTypePoints.setSuccsSelectOrg,
			payload: org
		});
		
	}

	const handlerFile = (cases:string,file:[]) =>{
		switch(cases){
			case 'file':
				dispatchBanners({
					type: ReducerActionTypePoints.setFile,
					payload: file
				});
			break;

			case 'smallfile':
				dispatchBanners({
					type: ReducerActionTypePoints.setSmallFile,
					payload: file
				});
			break;
		}
		
	}

	const handlerInput = (url:string) =>{
		dispatchBanners({
			type: ReducerActionTypePoints.setUrl,
			payload: url
		})
	}

	const imagesArr = useCallback((mass:string[]) => {
		console.log('massss',mass);
		return mass.map((val:string) => {
			return imgRout(val)
		})
    
  },[slideId])



	
	this.data({
		stateBanners,
		slideId,
		imagesArr,
  })
  this.handlers({
		register,
		handleSubmit,
    onSubmit,
		handlerFile,
		handlSelectOrg,
		router,
		onDelet,
		handlerInput
  })
  this.status({

  })
}
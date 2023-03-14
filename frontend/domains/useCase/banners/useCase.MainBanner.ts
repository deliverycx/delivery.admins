import { Tfile } from '@type';
import { useCallback, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestBanners, RequestOrganization } from 'servises/repository/Axios/Request';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { imgRout } from 'application/helpers/imgInit';
import { BannerReducer,initialStateBanner,ReducerActionTypePoints } from 'application/reducers/BannerReducer';

export function useMainBanner(this: any) {
	const [banners, setBanners] = useState<any[] | null>()

	useEffect(()=>{
		getBanners()
	},[])

	const getBanners = async () =>{
		try {
			const result = await RequestBanners.CRUDFabric.getAll()
			if(result.status === 200){
				setBanners(result.data)
			}else{
				setBanners(null)
			}
		} catch (error) {
			setBanners(null)
		}
	}

	const setBuImages = async (id:string,data:[]) =>{
		try {
			const result = await RequestBanners.CRUDFabric.setImages(id,{images:data})

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
		banners
  })
  this.handlers({
		setBuImages
  })
  this.status({

  })
}

export function useMainBannerForm(this: any) {
	const router = useRouter()
	const slideId = router.query.id as string

	const { register, handleSubmit } = useForm<{img:Tfile}>();

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
			const result = await RequestBanners.CRUDFabric.getBu(id)
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
		if (stateBanners.mobfile) {
      for (let i = 0; i < stateBanners.mobfile.length; i++) {
        formData.append('mobfile', stateBanners.mobfile[i])
      }
    }
		if (stateBanners.stories) {
      for (let i = 0; i < stateBanners.stories.length; i++) {
        formData.append('stories', stateBanners.stories[i])
      }
    }
		formData.append('organization',stateBanners.selectOrg) // data.org || (stateBanners.banners && stateBanners.banners.organization)
		formData.append('url', stateBanners.url)
		formData.append('order', data.order || (stateBanners.banners && stateBanners.banners.order) || 0)

	}

	const onSubmit = async (data:any) => {
    try {
      const formData = new FormData()
      fomrdata(formData,data)
			!slideId
						? await RequestBanners.CRUDFabric.create(formData)
						: await RequestBanners.CRUDFabric.edit(formData,slideId)
			router.push('/banners/mainbanner')
    } catch (error) {
      console.log(error);
    }
  }

	const onDelet = async (id:string) => {
    try {
      await RequestBanners.CRUDFabric.delet(id)
			router.push('/banners/mainbanner')
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

			case 'mobfile':
				dispatchBanners({
					type: ReducerActionTypePoints.setMobfile,
					payload: file
				});
			break;

			case 'stories':
				dispatchBanners({
					type: ReducerActionTypePoints.setStories,
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
		return mass.map((val:string) => {
			return imgRout(val)
		})
  },[slideId])

	console.log(stateBanners);

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

export function useBannerModal(this: any,request?:any) {
	const [banners,setBanners] = useState()
	const [modal,setModal] = useState(false)

	const getBanners = async () =>{
		try {
			if(request){
				const data = await request()
				setBanners(data)
			}else{
				const {data} = await RequestBanners.CRUDFabric.getAll()
				console.log(data);
				setBanners(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getBanners()
	},[])

	this.data({
		banners,
		modal
  })
	this.handlers({
		setModal
  })
	this.status({

  })
}

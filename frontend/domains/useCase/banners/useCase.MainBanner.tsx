import { Tfile } from '@type';
import { useFroms } from 'application/hooks/useForms';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestBanners, RequestOrganization } from 'servises/repository/Axios/Request';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { imgRout } from 'application/helpers/imgInit';

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
			const result = await RequestBanners.getBuOrg(selectOrg)
			
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
	const [filee, setfile] = useState<any>(false)
	const [banners,setBanners] = useState<any[] | null>()
	const [organizations, setOrganizations] = useState<any>()
	const [selectOrg, setSelectOrg] = useState<string | null>()
	const [error, setError] = useState<boolean | null>(null)

	useEffect(()=>{
		slideId && getBu(slideId)
		fetchOrg()
	},[slideId])


	const getBu = async (id:string) =>{
		try {
			const result = await RequestBanners.getBu(id)
			
			if(result.status === 200){
				setBanners(result.data)
				slideId && setSelectOrg(result.data.organization)
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

	const fomrdata = (formData:any,data:any) => {
		if (filee) {
      for (let i = 0; i < filee.length; i++) {
				console.log(filee[i]);
        formData.append('files', filee[i])
      }
        
    }
		formData.append('organization', selectOrg)

	}


	const onSubmit = async (data:any) => {
    try {
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
		const {data} = await RequestBanners.getBuOrg(org)
		if(!slideId && (data && data.organization === org)){
			setError(true)
		}else{
			setSelectOrg(org)
			setError(false)
		}
		
	}

	

	const imagesArr = useCallback((mass:string[]) => {
    return mass.map((val:string) => {
      return imgRout(val)
    })
  },[slideId])

	
	console.log(banners);
	this.data({
		register,
		banners,
		organizations,
		slideId,
		imagesArr,
		selectOrg
  })
  this.handlers({
		handleSubmit,
    onSubmit,
		setfile,
		handlSelectOrg,
		router,
		onDelet
  })
  this.status({
    error
  })
}
import { Tfile } from '@type';
import { useFroms } from 'application/hooks/useForms';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestBanners, RequestNews, RequestOrganization } from 'servises/repository/Axios/Request';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { imgRout } from 'application/helpers/imgInit';

export function useNews(this: any) {
	const [news,setNews] = useState<any[] | null>()

	useEffect(()=>{
		getList()
	},[])


	const getList = async () =>{
		try {
			const result = await RequestNews.getAll()
			
			if(result.status === 200){
				setNews(result.data)
			}else{
				setNews(null)
			}
		} catch (error) {
			setNews(null)
		}
		
	}
	

	
	

	this.data({
		news
  })
  this.handlers({

  })
  this.status({
    
  })
}

export function useNewsForm(this: any) {
	const router = useRouter()
	const slideId = router.query.id as string

	const { register, handleSubmit, watch } = useForm<{img:Tfile}>();
	const [filee, setfile] = useState<any>(false)
	const [newslist,setNewslist] = useState<any[] | null>()
	const [input,setInput] = useState<string>()

	useEffect(()=>{
		slideId && getList(slideId)
	},[slideId])


	const getList = async (id:string) =>{
		try {
			const result = await RequestNews.getBu(id)
			
			if(result.status === 200){
				setNewslist(result.data)
			}else{
				setNewslist(null)
			}
		} catch (error) {
			setNewslist(null)
		}
		
	}
	

	const fomrdata = (formData:any,data:any) => {
		if (filee) {
      for (let i = 0; i < filee.length; i++) {
				console.log(filee[i]);
        formData.append('files', filee[i])
      }
        
    }
		formData.append('link', input)

	}


	const onSubmit = async (data:any) => {
    try {
      const formData = new FormData()
      fomrdata(formData,data)
			!slideId 
						? await RequestNews.create(formData)
						: await RequestNews.edit(formData,slideId)
			router.back()
    } catch (error) {
      console.log(error);
    }
  }

	const onDelet = async (id:string) => {
    try {
      await RequestNews.delet(id)
			router.back()
    } catch (error) {
      console.log(error);
    }
  }

	

	const imagesArr = useCallback((mass:string[]) => {
    return mass.map((val:string) => {
      return imgRout(val)
    })
  },[slideId])


	this.data({
		register,
		newslist,
		slideId,
		imagesArr
  })
  this.handlers({
		handleSubmit,
    onSubmit,
		setfile,
		router,
		onDelet,
		setInput
  })
  this.status({
    
  })
}
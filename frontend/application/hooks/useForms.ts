import { Tfile } from "@type"
import { useRouter } from "next/router"
import { useState } from "react"

type Tfomrdata = (fomrdata:any,data:any) => void

export const useFroms = (fomrdata:Tfomrdata,request:any,filee?:Tfile) =>{
	const [slideState, setSlide] = useState<null | any>(null)
	const router = useRouter()
	const { id } = router.query

	
	const onSubmit = async (data:any) => {
    try {
      const formData = new FormData()
      fomrdata(formData,data)
			console.log(formData);
			await request.create(formData)
			
    } catch (error) {
      console.log(error);
    }
  }

	return {
    slideState,
    onSubmit
  }
}
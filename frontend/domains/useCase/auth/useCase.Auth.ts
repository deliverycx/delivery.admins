import { useState } from "react"
import { RequestUsers } from "servises/repository/Axios/Request"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { IAdminUser } from "@type";
import { requestUserRegister } from "servises/repository/Axios/Request/Request.User";
import axios from "axios";

export function useCaseAuth(this: any) {
  const [error, setError] = useState(false)
  const router = useRouter()

  const onSubmitAuth = async (event: any) => {
    event.preventDefault()
    const user = {
      name: event.target[0].value,
      password:event.target[1].value
    }
    try {
      const { data } = await RequestUsers.login(user)
      if (data) {
        //const response = await axios.post('/api/auth/login',user)
        //router.push('/')
      }
      
    } catch (error) {
      setError(true)
    }
  }

  this.data({
    error
  })
  this.handlers({
    onSubmitAuth
  })
  this.status({
    
  })
}

export function useCaseAuthOrgUser(this: any,id:string) {
	const router = useRouter()

	const initState = {
		token:'',
		merchantId:''
	}
	const [modal,setModal] = useState<boolean>()
	const [users,setUsers] = useState<IAdminUser | null>(null)
	const [role,setRole] = useState<string>('admin')
	
	const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();

	const onSubmit = async (data:any) => {
		console.log(data);
    try {
			!users
					? await requestUserRegister.regUsers({...data,organization:id,role})
					: await requestUserRegister.CRUDFabric.edit({...data,organization:id},users._id)
			setModal(false)
			router.reload()
    } catch (error) {
      console.log(error);
    }
  }

	const onChangeUser = (event:any) =>{
		console.log(event.target.value);
		setRole(event.target.value)
	}

	this.data({
    modal,
		users
  })
  this.handlers({
    setModal,
		handleSubmit,
		register,
		onSubmit,
		onChangeUser
  })
  this.status({
    
  })
}
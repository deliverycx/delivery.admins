import { useEffect, useState } from "react"
import { RequestUsers } from "servises/repository/Axios/Request"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { IAdminUser } from "@type";
import { requestUserRegister } from "servises/repository/Axios/Request/Request.User";
import axios from "axios";
import { useAuthCheck } from "application/hooks/useAuthCheck";

export function useCaseAuth(this: any) {
  const [error, setError] = useState(false)
  const router = useRouter()
	const {userRout} = useAuthCheck()

  const onSubmitAuth = async (event: any) => {
    event.preventDefault()
    const user = {
      name: event.target[0].value,
      password:event.target[1].value
    }
    try {
      const { data } = await RequestUsers.login(user)
      if (data) {
        const response = await axios.post('/api/auth/login',data)
				if(response.data){
					userRout(response.data)
				}
        
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
			await requestUserRegister.regUsers({...data,organization:id,role})
			setModal(false)
			getUsers()
    } catch (error) {
      console.log(error);
    }
  }

	useEffect(()=>{
		id && getUsers()
	},[id])

	const getUsers = async () =>{
		try {
			const {data} = await RequestUsers.CRUDFabric.getBuAllOrg(id)
			setUsers(data)
		} catch (error) {
			console.log(error);
		}
	}

	const deliteUser = async (id:string) =>{
		try {
			await RequestUsers.CRUDFabric.delet(id)
			getUsers()
		} catch (error) {
			console.log(error);
		}
	}

	const onChangeUser = (event:any) =>{
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
		onChangeUser,
		deliteUser
  })
  this.status({
    
  })
}
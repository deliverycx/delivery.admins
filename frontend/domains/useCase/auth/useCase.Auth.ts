import { useState } from "react"
import { RequestUsers } from "servises/repository/Axios/Request"
import { useRouter } from 'next/router';

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
        localStorage.setItem("authToken", data.access_token)
        router.push('/')
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
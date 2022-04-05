/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RequestUsers } from 'servises/repository/Axios/Request';

export function useAuthCheck() {
  const router = useRouter()
  const check = async () => {
    try {
      const user = await RequestUsers.check()
      return user.data
    } catch (error) {
      return null
    }
  }
  useEffect(() => {
    console.log(check())
    if (!check()) {
      router.push('/login')
    }
  },[])
}
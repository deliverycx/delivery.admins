/* eslint-disable react-hooks/rules-of-hooks */
import { User } from '@type';
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
      router.push('/auth')
    }
  }


  useEffect(() => {
    check()
  }, [router.asPath])

	const userRout = (user:User) =>{
		if(user.role){
			switch(user.role){
				case 'admin': router.push('/organization')
			}
		}else{
			router.push('/')
		}
	}


	return {
		userRout
	}
}
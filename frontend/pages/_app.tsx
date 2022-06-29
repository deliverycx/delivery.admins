import '../styles/adminlte.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useAuthCheck } from 'application/hooks/useAuthCheck'
import { useEffect } from 'react'
import { useRouter } from 'next/router'




function MyApp({ Component, pageProps }: AppProps) {
  
  /**/
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
  }, [])
  
  
  return <Component {...pageProps} />
}

export default MyApp

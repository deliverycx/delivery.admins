import '../styles/adminlte.min.css'
import type { AppProps } from 'next/app'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import your fontawesome library
import './fontawesome';
import './../styles/index.scss'


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

import '../styles/adminlte.min.css'
import type { AppProps } from 'next/app'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import './../styles/index.scss'


function MyApp({ Component, pageProps }: AppProps) {

  /**/
  const router = useRouter()
  const check = async () => {
    try {
      const user = await RequestUsers.check()
			console.log(user);
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

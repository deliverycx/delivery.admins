import '../styles/adminlte.min.css'
import type { AppProps } from 'next/app'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import './../styles/index.scss'
import { useAuthCheck } from 'application/hooks/useAuthCheck'
import { User } from '@type'
import { sessionOptions } from 'application/helpers/session'
import { withIronSessionSsr } from 'iron-session/next'



export default function MyApp({ Component, pageProps }: AppProps) {

  /*
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
*/
	useAuthCheck()

  return <Component {...pageProps} />
}

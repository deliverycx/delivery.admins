import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import Footer from 'application/components/common/Footer/Footer'
import Header from 'application/components/common/Header/Header'
import Menu from 'application/components/common/Menu/Menu'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

const Home: NextPage = () => {

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
  
  
  return (
    <div className="wrapper">

    <Header />
    <Menu />
  
  
  

  

  
  <Footer />
  
</div>
  )
}

export default Home

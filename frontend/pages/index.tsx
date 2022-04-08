import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import Footer from 'application/components/common/Footer/Footer'
import Header from 'application/components/common/Header/Header'
import Menu from 'application/components/common/Menu/Menu'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react';

const Home: NextPage = () => {
  
  
  return (
    <div className="wrapper">

    <Header />
    <Menu />
  
  
  

  

  
  <Footer />
  
</div>
  )
}

export default Home

/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import Footer from 'application/components/common/Footer/Footer'
import Header from 'application/components/common/Header/Header'
import Menu from 'application/components/common/Menu/Menu'
import { RequestUsers } from 'servises/repository/Axios/Request'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { User } from '@type'
import { sessionOptions, withCheckSession } from 'application/helpers/session'
import { withIronSessionSsr } from 'iron-session/next'
import { userRout } from 'application/contstans/userRout.const'

const Home: NextPage = () => {
  
  return (
		<>
    <div className="wrapper">

    <Header />
    <Menu />
  
  
  

  

  
  	<Footer />
		  
		</div>
		</>
  )
}

export default Home
//export const getServerSideProps = withCheckSession({...userRout.superAdmin})
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    console.log(user);

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  sessionOptions
);
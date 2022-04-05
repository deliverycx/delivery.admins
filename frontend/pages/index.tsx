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
  
  
  

  
  <div className="content-wrapper">
    
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Starter Page</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Starter Page</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>

                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the content.
                </p>
								

					<form action="/name" method="POST">
            <input type="text" name="name" placeholder="Add your kitten name here" />
            <input type="submit" value="Submit" />
        </form>

                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>

            <div className="card card-primary card-outline">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>

                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the
                  content.
                </p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h5 className="m-0">Featured</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Special title treatment</h6>

                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>

            <div className="card card-primary card-outline">
              <div className="card-header">
                <h5 className="m-0">Featured</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Special title treatment</h6>

                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          
        </div>
       
      </div>
    </div>
    
  </div>
  
  <aside className="control-sidebar control-sidebar-dark">
    
    <div className="p-3">
      <h5>Title</h5>
      <p>Sidebar content</p>
    </div>
  </aside>
  

  
  <Footer />
  
</div>
  )
}

export default Home

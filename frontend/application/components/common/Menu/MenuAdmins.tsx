import axios from "axios"
import { useRouter } from "next/router"

const MenuAdmins = () =>{
	const router = useRouter()

	const deliteCookies = async () =>{
		try {
			const {data} = await axios.get('/api/auth/logout')
			if(data && data.ok){
				router.push('/auth')
			}
		} catch (error) {
			console.log(error);
		}
		
	}

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    

      
      

    
    <div className="sidebar">
			<div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">admin</a>
					<a onClick={deliteCookies}>выйти</a>
        </div>
      </div>
     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className="nav-item">
            <a href="/managers" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Заказы оплата
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            
						
						
						</li>
          
        </ul>
      </nav>
      
    </div>
    
  </aside>
  )
}
export default MenuAdmins
const Menu = () =>{
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    
    

    
    <div className="sidebar">
      
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">admin</a>
        </div>
      </div>

      
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className="nav-item menu-open">
            <a href="/upload" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Обновление Айко
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <a href="/organization" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Организации
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
						<a href="/banners" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Баннеры
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
export default Menu
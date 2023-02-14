const MenuAdmins = () =>{
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    
    

    
    <div className="sidebar">
     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className="nav-item">
            <a href="/upload" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Обновление Айко
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <a href="/organization/" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Организации
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
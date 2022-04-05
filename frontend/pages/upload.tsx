import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import { NextPage } from "next"

const Upload: NextPage = () => {
  return (
    <div className="wrapper">

    <Header />
    <Menu />
    <Container>
    

      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Title</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          Start creating your amazing application!
        </div>
        
        <div className="card-footer">
          Footer
        </div>
        
      </div>
      

    
    </Container>
      </div>
  )
}
export default Upload
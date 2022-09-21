import { adapterComponentUseCase } from "adapters/adapterComponents"
import FormSelectOrganization from "application/components/common/Form/FormSelectOrganization"
import { useDisplayBannerFrom } from "domains/useCase/banners/useCase.DisplayBanner"
import { RequestDisplay } from "servises/repository/Axios/Request"
import { useState } from 'react';
import { useRouter } from "next/router";

const DisplayBannerAdd = () =>{
	const router = useRouter()
	const [orgid,setOrgid] = useState<string>()

	const handlSelectOrg = async () =>{
		try {
			await RequestDisplay.CRUDFabric.create({organization:orgid})
			router.reload()
		} catch (error) {
			console.log(error);
		}
	}

	
	return(
		
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Добавить организацию в отоброжение баннеров</h3>
							<div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
						<div className="card-body">
						<FormSelectOrganization  setter={setOrgid} />		
						
						<button onClick={()=> handlSelectOrg()} className="btn btn-success float-left">Добавить</button>	
							
							
						</div>

          </div>

        </div>
        
      </div>
      
    </section>
	
	)
}
export default DisplayBannerAdd
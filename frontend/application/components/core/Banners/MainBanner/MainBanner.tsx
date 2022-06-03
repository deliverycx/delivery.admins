import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useMainBanner } from "domains/useCase/banners/useCase.MainBanner"

const MainBanner = () =>{
	const useCasePoints = adapterComponentUseCase(useMainBanner)
	const {banners,organizations} = useCasePoints.data
	const {setSelectOrg} = useCasePoints.handlers


	return(
		<div className="col-12 ma0-l">
			<div className="col-2 card-header">
				<a href="/banners/add" className="btn btn-block bg-gradient-secondary">Добавить слайдер</a>
			</div>
			
            <div className="card card-primary">
              <div className="card-header">
                <h4 className="card-title">Баннеры в топе</h4>
              </div>
							
              <div className="card-body">
							<div className="form-group">
                  <label htmlFor="exampleSelectBorder">Выбор точки</label>
                  <select className="custom-select form-control-border" name="org" id="exampleSelectBorder">
										{
											organizations &&
											organizations.map((val:any,index:number)=>{
												return (
													<>
														<option onClick={()=> setSelectOrg('all')}>Все</option>
														<option disabled>{val.name}</option>
														{
															val.organizations.map((org:any)=>{
																return <option key={org.id} onClick={()=> setSelectOrg(org.id)} value={org.id}>- {org.address.street}</option>
															})
														}
														
													</>
												)
												
											})
										}
                    
                  </select>
               </div>
                <div className="row">
									{
										banners &&
										banners.images.map((val:any,index:number)=>{
											return <div key={index} className="col-sm-2">
	                    <a href={`/banners/${banners._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
	                      <img src={imgRout(val)} className="img-fluid mb-2" alt="white sample"/>
	                    </a>
	                  </div>
										})
									}
                  
                  
                </div>
              </div>
            </div>
          </div>
	)
}
export default MainBanner
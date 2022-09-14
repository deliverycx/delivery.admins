import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useMainBanner } from "domains/useCase/banners/useCase.MainBanner"

const MainBanner = () =>{
	
	const useCasePoints = adapterComponentUseCase(useMainBanner)
	const {banners,organizations} = useCasePoints.data
	const {setSelectOrg,setBuImages} = useCasePoints.handlers

	const grid = 4;
	const getItemStyle = () => ({
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: '#f0f0f0',
	});

	const handleSelect = (e:any) => setSelectOrg(e.target.value)					

	return(
		<div className="col-12 ma0-l">
			<div className="col-2 card-header">
				<a href="/banners/mainbanner/add" className="btn btn-block bg-gradient-secondary">Добавить банер</a>
			</div>
			
            <div className="card card-primary">
              <div className="card-header">
                <h4 className="card-title">Баннеры в топе</h4>
              </div>
							
              <div className="card-body">
							<div className="form-group">
                  <label htmlFor="exampleSelectBorder">Выбор точки</label>
                  <select className="custom-select form-control-border" onChange={handleSelect} name="org">
										{
											organizations &&
											organizations.map((val:any,index:number)=>{
												return (
													<>
														<option value="all">Все точки</option>
														<option disabled>{val.name}</option>
														{
															val.organizations.map((org:any)=>{
																return <option key={org.id} value={org.id}>- {org.address.street}</option>
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
										banners.sort((a:any,b:any) => (a.order - b.order)).map((val:any) =>{
											return (
												<div
												key={val._id}
												style={getItemStyle()}
												className="col-sm-2"
												>
												<a href={`/banners/mainbanner/${val._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
												<img src={imgRout(val.images[0])} className="img-fluid mb-2" alt="white sample"/>
											</a>
											</div>
											)
										})
									}


									{
										/*

										<DragDropHorizontal list={banners.images} render={(val:any) =>(
											<a href={`/banners/${banners._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
											<img src={imgRout(val.content)} className="img-fluid mb-2" alt="white sample"/>
										</a>
										)}
										handle={(items:any)=>{
											setBuImages(banners._id,items)
										}}
										
										/>
										*/
									}
									
									
							
                  
                  
                </div>
								
              </div>
            </div>
          </div>
	)
}
export default MainBanner
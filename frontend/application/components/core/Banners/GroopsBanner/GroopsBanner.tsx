import { IGroopsBanner } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useGroopsBanner } from "domains/useCase/banners/useCase.GroopsBanner"

const GroopsBanner = () =>{
	const useCaseGroops = adapterComponentUseCase(useGroopsBanner)
	const {data} = useCaseGroops.data

	const grid = 4;
	const getItemStyle = () => ({
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: '#f0f0f0',
	});

	return(
		<div className="col-12 ma0-l">
			
			<div className="col-2 card-header">
				<a href="/banners/groops/add" className="btn btn-block bg-gradient-secondary">Добавить банер</a>
			</div>

					{
								<div className="card card-primary">
		              <div className="card-header">
		                <h4 className="card-title">Категория Меню</h4>
		              </div>
		              <div className="card-body">
										<div className="form-group">

											{
												data && data.map((val:IGroopsBanner)=>{
													return (
														val.category === 'меню' &&
														<div key={val._id} className="card-body">
															<div className="card-footer">
														 		<a className="card-title" href={`/banners/groops/${val._id}`}>{val.name}	</a>
														 	</div>
															 <br /> 
                            	 <hr />
															 <div className="card-body">
																	<div className="row banners_box">
																		{
																			data.banners &&
																			data.banners.map((val:any) =>{
																					return (
																						<div
																						key={val._id}
																						style={getItemStyle()}
																						className="col-sm-2 banner-item"
																						>
																						<a href={`/banners/groops/${val._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
																						<img src={imgRout(val.images[0])} className="img-fluid mb-2" alt="white sample"/>
																					</a>
																					</div>
																					)
																				})
																			}

										                  
												                </div>
																		</div>
														</div>
													)
												})	
											}
			                 

			                
												
										
			                  
			                  
			               </div>
		              </div>
		            </div>

						
					}
            




          </div>
	)
}
export default GroopsBanner
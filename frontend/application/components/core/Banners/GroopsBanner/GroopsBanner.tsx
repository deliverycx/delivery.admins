import { IGroopsBanner } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modal from "application/components/common/Modal/Modal"
import { bannerCategory } from "application/contstans/banners.const"
import { imgRout } from "application/helpers/imgInit"
import { useGroopsBanner } from "domains/useCase/banners/useCase.GroopsBanner"
import { useEffect, useState } from "react"
import BannerList from "../view/BannerList"
import BannerModal from "../view/BannerModal"

const GroopsBanner = () =>{
	const useCaseGroops = adapterComponentUseCase(useGroopsBanner)
	const {data} = useCaseGroops.data
	const {addBanner,deleteBanner,getAll} = useCaseGroops.handlers


	useEffect(()=>{
		getAll()
	},[])

	const grid = 4;
	const getItemStyle = () => ({
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: '#f0f0f0',
	});

	return(
		<div className="col-12 ma0-l">
			
			<div className="col-2 card-header">
				<a href="/banners/groops/add" className="btn btn-block bg-gradient-secondary">Добавить группу</a>
			</div>

					{
								<div className="card card-primary">
		              <div className="card-header">
		                <h4 className="card-title">Категория Общая</h4>
		              </div>
		              <div className="card-body">
										<div className="form-group">

											{
												data && data.map((val:IGroopsBanner)=>{
													return (
														val.category === bannerCategory.default &&
														<div key={val._id} className="card-body">
															<hr />
															<div className="card-footer">
														 		<a className="card-title" href={`/banners/groops/${val._id}`}>{val.name}	</a>
														 	</div>
															 <br /> 
                            	 
															 	<BannerModal addBanner={addBanner} idgroop={val._id} />
																
																
																<BannerList banners={val.banners} handler={(id) => deleteBanner(id,val._id)}>
																<div className="banner_delete">
																	<span className="banner_delete-del">Удалить</span>
																</div>
																</BannerList>
														</div>
													)
												})	
											}

			               </div>
		              </div>
		            </div>

						
					}

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
														val.category === bannerCategory.menu &&
														<div key={val._id} className="card-body">
															<hr />
															<div className="card-footer">
														 		<a className="card-title" href={`/banners/groops/${val._id}`}>{val.name}	</a>
														 	</div>
															 <br /> 
                            	 
															 	<BannerModal addBanner={addBanner} idgroop={val._id} />
																
																
																<BannerList banners={val.banners} handler={(id) => deleteBanner(id,val._id)}>
																<div className="banner_delete">
																	<span className="banner_delete-del">Удалить</span>
																</div>
																</BannerList>
														</div>
													)
												})	
											}

			               </div>
		              </div>
		            </div>

						
					}
          {
						<div className="card card-primary">
						<div className="card-header">
							<h4 className="card-title">Категория доставка</h4>
						</div>
						<div className="card-body">
							<div className="form-group">

								{
									data && data.map((val:IGroopsBanner)=>{
										return (
											val.category === bannerCategory.delivery &&
											<div key={val._id} className="card-body">
												<div className="card-footer">
													 <a className="card-title" href={`/banners/groops/${val._id}`}>{val.name}	</a>
												 </div>
												 <br /> 
												 <hr />
												 
												 			<BannerModal addBanner={addBanner} idgroop={val._id} />
															<BannerList banners={val.banners} handler={(id) => deleteBanner(id,val._id)}>
															<div className="banner_delete">
																<span className="banner_delete-del">Удалить</span>
															</div>
															</BannerList>
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
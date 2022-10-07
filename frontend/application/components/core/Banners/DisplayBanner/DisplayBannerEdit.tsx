import { adapterComponentUseCase } from "adapters/adapterComponents"
import FormSelectOrganization from "application/components/common/Form/FormSelectOrganization"
import Modal from "application/components/common/Modal/Modal"
import { useDisplayBannerFrom } from "domains/useCase/banners/useCase.DisplayBanner"
import BannerList from "../view/BannerList"
import BannerModal from "../view/BannerModal"
import { useState } from 'react';
import GroopsModal from "../view/GroopsModal"
import { IGroopsBanner } from "@type"

const DisplayBannerEdit = () => {
	const useCasePoints = adapterComponentUseCase(useDisplayBannerFrom)
	const { pageid, data, groops } = useCasePoints.data
	const { handleSubmit, onSubmit, router, onDelet, handlSelectOrg, addBuField, deleteBanner } = useCasePoints.handlers

	const [modalBanner,setModalBanner] = useState(false)
	

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
								{
									data &&
									<FormSelectOrganization selected={data.organization} setter={handlSelectOrg} />
								}
							</div>

							<div className="card-body">
							<h3>Группы банеров</h3>
								{
									data &&
									<>
									<GroopsModal addGroop={addBuField} idgroop={'groopbanner'} />
									{
										data.groopbanner && data.groopbanner.length > 0 &&
										data.groopbanner.map((val:IGroopsBanner)=>{
											return (
												
													<div key={val._id}>
															<hr />
															<div className="card-footer">
														 		<a className="card-title">{val.name}	</a>
																<a onClick={()=> deleteBanner(val._id, 'groopbanner')}>Удалить</a>
														 	</div>
															 
															 <BannerList banners={val.banners} handler={(id) => {
																			
																			setModalBanner(false)
																		}} />

														</div>
												
											)
										})
									}
									
									</>
									
								}

							</div>
							<div className="card-body">
								<h3>Баннеры</h3>
								{
									data &&
									<>
										<BannerModal addBanner={addBuField} idgroop={'banners'} />
										<BannerList banners={data.banners} handler={(id) => deleteBanner(id, 'banners')}>
											<div className="banner_delete">
												<span className="banner_delete-del">Удалить</span>
											</div>
										</BannerList>
									</>
								}

							</div>

						</div>

					</div>

				</div>
				<div className="row">
					<div className="col-12">
						<a onClick={router.back} className="btn btn-secondary">Cancel</a>

						<input type="submit" value="Сохранить" className="btn btn-success float-right" />
						{
							pageid &&
							<a className="btn btn-secondary float-right" onClick={() => onDelet(pageid)}>Удалить</a>
						}

					</div>

				</div>
			</section>
		</form>
	)
}
export default DisplayBannerEdit
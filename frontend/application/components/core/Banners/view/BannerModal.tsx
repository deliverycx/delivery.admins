import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useBannerModal } from "domains/useCase/banners/useCase.MainBanner"
import { FC } from 'react';

type IProps = {
	selectbanners:string[]
	addBanner:(id:string) => void
}

const BannerModal:FC<IProps> = ({selectbanners,addBanner}) => {
	const useCaseBannerModal = adapterComponentUseCase(useBannerModal)
	const {banners,modal} = useCaseBannerModal.data
	const {setModal} = useCaseBannerModal.handlers

	const grid = 4;
	const getItemStyle = () => ({
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: '#f0f0f0',
	});

	return (
		<>
			<button type="button" className="btn btn-block btn-default col-md-2" onClick={()=> setModal(true)}>Добавить Баннер</button>
			{
				(modal && banners)  &&
				<div className="modal_box">
					<div className="modal_overfloy"  onClick={()=> setModal(false)}></div>
						<div className="col-md-8 modales">
						<div className="card card-warning">
							<div className="card-header">
								<h3 className="card-title">Removable</h3>

								<div className="card-tools">
									<button type="button" className="btn btn-tool" data-card-widget="remove" onClick={()=> setModal(false)}>
										<img src="/img/close.png" />
									
									</button>
								</div>
								
							</div>
							
							<div className="card-body">
							<div className="row banners_box">
										{
											banners &&
											banners.sort((a:any,b:any) => (a.order - b.order)).map((val:any) =>{
												return (
													<div
													key={val._id}
													style={getItemStyle()}
													className="col-sm-2 banner-item"
													onClick={()=> addBanner(val._id)}
													>
													<a data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
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
				</div>
				
			}
			
		</>
	)
}
export default BannerModal
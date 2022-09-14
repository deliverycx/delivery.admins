import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useBannerModal } from "domains/useCase/banners/useCase.MainBanner"
import { FC } from 'react';
import BannerList from "./BannerList";

type IProps = {
	addBanner:(id:string,idgroop:string) => void
	idgroop:string
	request?:any
}

const BannerModal:FC<IProps> = ({addBanner,idgroop,request}) => {
	const useCaseBannerModal = adapterComponentUseCase(useBannerModal,request)
	const {banners,modal} = useCaseBannerModal.data
	const {setModal} = useCaseBannerModal.handlers

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
							
							<BannerList banners={banners} handler={(id) => {
								addBanner(id,idgroop)
								setModal(false)
							}} />
							
						</div>
						
					</div>
				</div>
				
			}
			
		</>
	)
}
export default BannerModal
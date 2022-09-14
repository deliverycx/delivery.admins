import { IGroopsBanner } from "@type";
import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modal from "application/components/common/Modal/Modal";
import { imgRout } from "application/helpers/imgInit"
import { useBannerModal } from "domains/useCase/banners/useCase.MainBanner"
import { FC, useEffect, useState } from 'react';
import RequestGroops from "servises/repository/Axios/Request/Request.Groops";
import BannerList from "./BannerList";

type IProps = {
	addGroop:(id:string,field:string) => void
	idgroop:string
}

const GroopsModal:FC<IProps> = ({addGroop,idgroop}) => {
	const [groops,setGroops] = useState<IGroopsBanner[]>()
	const [modal,setModal] = useState(false)
	const [modalBanner,setModalBanner] = useState(false)

	const fetchGroopsBanner = async () => {
    try {
      const { data } = await RequestGroops.CRUDFabric.getAll()
			console.log(data);
			setGroops(data)
    } catch (error) {
      console.log(error)
    }
  }

	useEffect(()=>{
		fetchGroopsBanner()
	},[])

	return (
		<>
			<button type="button" className="btn btn-block btn-default col-md-2" onClick={()=> setModal(true)}>Добавить группу</button>
			{
				(modal && groops)  &&
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

							{
								<div className="card card-primary">
		              <div className="card-header">
		                <h4 className="card-title">Категория Меню</h4>
		              </div>
		              <div className="card-body">
										<div className="form-group">

											{
												groops && groops.map((val:IGroopsBanner)=>{
													return (
														val.category === 'меню' &&
														<div key={val._id}>
															<hr />
															<div className="card-footer">
														 		<a className="card-title" onClick={()=> {
																	addGroop(val._id,idgroop)
																	setModal(false)
																}}>{val.name}	</a>
																<a onClick={() => setModalBanner(true)}>Посмотреть банеры</a>
														 	</div>
															 
																{
																	modalBanner &&
																	<Modal setter={setModalBanner}>
																		<BannerList banners={val.banners} handler={(id) => {
																			
																			setModalBanner(false)
																		}} />
																 	</Modal>
																}

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
												groops && groops.map((val:IGroopsBanner)=>{
													return (
														val.category === 'доставка' &&
														<div key={val._id}>
															<hr />
															<div className="card-footer">
														 		<a className="card-title" onClick={()=> {
																	addGroop(val._id,idgroop)
																	setModal(false)
																} }>{val.name}	</a>
																<a onClick={() => setModalBanner(true)}>Посмотреть банеры</a>
														 	</div>
															 
																{
																	modalBanner &&
																	<Modal setter={setModalBanner}>
																		<BannerList banners={val.banners} handler={(id) => {
																			
																			setModalBanner(false)
																		}} />
																 	</Modal>
																}

														</div>
													)
												})	
											}

			               </div>
		              </div>
		            </div>

						
					}
							
							
							
						</div>
						
					</div>
				</div>
				
			}
			
		</>
	)
}
export default GroopsModal
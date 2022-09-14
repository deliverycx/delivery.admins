import { IDisplayBanner } from "@type"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useDisplayBanner } from "domains/useCase/banners/useCase.DisplayBanner"
import DisplayBannerItem from "./DisplayBannerItem"

const DisplayBanner = () =>{
	const useCasePoints = adapterComponentUseCase(useDisplayBanner)
	const {display} = useCasePoints.data
	const {} = useCasePoints.handlers

	return(
		<div className="col-12 ma0-l">
			
			<div className="col-2 card-header">
				<a href="/banners/display/add" className="btn btn-block bg-gradient-secondary">Добавить банер</a>
			</div>
			<div className="card card-primary">
		              <div className="card-header">
		                <h4 className="card-title">Категория Меню</h4>
		              </div>
		              <div className="card-body">
										<div className="form-group">
											{
												display &&
												display.map((val:IDisplayBanner)=>{
													return <DisplayBannerItem key={val._id} idorganization={val.organization} idpage={val._id} />
												})
											}
			               </div>
		              </div>
		            </div>
		</div>
	)
}
export default DisplayBanner
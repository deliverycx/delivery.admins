import { IDisplayBanner } from "@type"
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { useDisplayBanner } from "domains/useCase/banners/useCase.DisplayBanner"
import React from "react"
import DisplayBannerFilter from "./DisplayBannerFilter"
import DisplayBannerItem from "./DisplayBannerItem"

export const DisplayContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const DisplayBanner = () =>{
	const useCaseDisplay = adapterComponentUseCase(useDisplayBanner)
	const {display} = useCaseDisplay.data
	const {} = useCaseDisplay.handlers

	return(
		<div className="col-12 ma0-l">
			
			<div className="col-2 card-header">
				<a href="/banners/display/add" className="btn btn-block bg-gradient-secondary">Добавить банер</a>
			</div>
			<DisplayContext.Provider value={useCaseDisplay}>
				<DisplayBannerFilter />
			</DisplayContext.Provider>
			
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
import { IGroopsBanner } from "@type"
import { useContext } from "react"
import { DisplayContext } from "./DisplayBanner"
import cn from "classnames";

const DisplayBannerFilter = () => {
	const useCaseDisplay = useContext(DisplayContext)
	const { groops,filter } = useCaseDisplay.data
	const {setFilter} = useCaseDisplay.handlers

	

	return (

		<div className="card card-primary">
			<div className="card-header">
				<h4 className="card-title">Фильтр</h4>
			</div>
			<div className="card-body">
				<div className="form-group">
					<div className="row">
						<div className="col-3">
							<h3>Меню</h3>
							<hr />
							{
								groops && groops.map((val: IGroopsBanner) => {
									const CN = cn("filter_items", { selected: filter.includes(val._id)})
									return (
										val.category === 'меню' &&
											<div className={CN}>
												<div key={val._id} 
													onClick={()=> setFilter((prev:any) => [...prev,val._id])}>
														{val.name} 
												</div>
												{
													filter.includes(val._id) &&
													<img width="15" height="15" className="cansel" src="/img/cansel.png"
														onClick={() => setFilter((prev:any) => {
															return prev.filter((id:string)=> id != val._id)
														})}
													/>	
												}
												
												</div>
									)
								})
							}
						</div>
						<div className="col-3">
							<h3>Доставка</h3>	
							<hr />
							{
								groops && groops.map((val: IGroopsBanner) => {
									const CN = cn("filter_items", { selected: filter.includes(val._id)})
									return (
										val.category === 'доставка' &&
										<div className={CN}>
												<div key={val._id} 
													onClick={()=> setFilter((prev:any) => [...prev,val._id])}>
														{val.name} 
												</div>
												{
													filter.includes(val._id) &&
													<img width="15" height="15" className="cansel" src="/img/cansel.png"
														onClick={() => setFilter((prev:any) => {
															return prev.filter((id:string)=> id != val._id)
														})}
													/>	
												}
												
												</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}
export default DisplayBannerFilter
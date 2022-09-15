import { IGroopsBanner } from "@type"
import { useContext } from "react"
import { DisplayContext } from "./DisplayBanner"

const DisplayBannerFilter = () => {
	const useCaseDisplay = useContext(DisplayContext)
	const { groops } = useCaseDisplay.data
	const {handlerFilter} = useCaseDisplay.handlers

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
									return (
										val.category === 'меню' &&
											<>
												<div key={val._id} className="title" onClick={()=> handlerFilter(val._id)}>{val.name}	</div><br />
											</>
									)
								})
							}
						</div>
						<div className="col-3">
							<h3>Доставка</h3>	
							<hr />
							{
								groops && groops.map((val: IGroopsBanner) => {
									return (
										val.category === 'доставка' &&
											<>
												<div key={val._id} className="title" onClick={()=> handlerFilter(val._id)}>{val.name}	</div><br />
												
											</>
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
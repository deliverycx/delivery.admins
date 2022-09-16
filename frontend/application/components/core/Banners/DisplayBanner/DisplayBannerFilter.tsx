import { IGroopsBanner } from "@type"
import { useContext } from "react"
import { DisplayContext } from "./DisplayBanner"

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
									return (
										val.category === 'меню' &&
											<>
												<div key={val._id} className="title" 
													onClick={()=> setFilter((prev:any) => [...prev,val._id])}>
														{val.name} <span> --{filter.includes(val._id) && 'active'}</span>
														- 
												</div>
												{<span onClick={() => setFilter((prev:any) => {
																return prev.filter((id:string)=> id != val._id)
														})}>удалить</span>}
												<br />		
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
											<div key={val._id} className="title" 
												onClick={()=> setFilter((prev:any) => [...prev,val._id])}>
													{val.name} <span> --{filter.includes(val._id) && 'active'}</span>
													- 
											</div>
											{<span onClick={() => setFilter((prev:any) => {
															return prev.filter((id:string)=> id != val._id)
													})}>удалить</span>}
											<br />		
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
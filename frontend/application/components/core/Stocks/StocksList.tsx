import { adapterComponentUseCase } from "adapters/adapterComponents"
import { imgRout } from "application/helpers/imgInit"
import { useMainBanner } from "domains/useCase/banners/useCase.MainBanner"
import { useNews } from "domains/useCase/news/useCase.News"
import { useStocks } from "domains/useCase/stocks/useCase.Stocks"

const StocksList = () =>{
	const useCasePoints = adapterComponentUseCase(useStocks)
	const {news} = useCasePoints.data


	return(
		<div className="col-12 ma0-l">
			<div className="col-2 card-header">
				<a href="/stocks/add" className="btn btn-block bg-gradient-secondary">Добавить акцию</a>
			</div>
			
            <div className="card card-primary">
              <div className="card-header">
                <h4 className="card-title">Акции</h4>
              </div>
							
              <div className="card-body">
							
                <div className="row">
									{
										news &&
										news.map((val:any,index:number)=>{
											return <div key={index} className="col-sm-2">
	                    <a href={`/news/${val._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
	                      <img src={imgRout(val.images[0])} className="img-fluid mb-2" alt="white sample"/>
	                    </a>
											<span>{val.link}</span>
	                  </div>
										})
									}
                  
                  
                </div>
              </div>
            </div>
          </div>
	)
}
export default StocksList
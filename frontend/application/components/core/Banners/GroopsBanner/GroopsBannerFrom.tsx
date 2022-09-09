import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useGroopsBanner } from "domains/useCase/banners/useCase.GroopsBanner"
import { useMainBannerForm } from "domains/useCase/banners/useCase.MainBanner"
import BannerModal from "../view/BannerModal"

const GroopsBannerFrom = () =>{
	const useCasePoints = adapterComponentUseCase(useGroopsBanner)
	const {pageid,data} = useCasePoints.data
	const {register,handleSubmit,onSubmit,router,onDelet,addBanner} = useCasePoints.handlers

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Добавить/Редактировать Группу</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
							


							 
							
							 <div className="popBox_item form-group"> 
			            <label className="form-label">Название</label>
			            <input type="text" {...register('name')} defaultValue={'qqqq'} name="name" className="form-control" />
			        </div>
							<div className="popBox_item form-group"> 
									<label className="form-label">Категория</label><br />
			            <select {...register('category')} name="category">
										<option>доставка</option>
										<option>меню</option>
									</select>
							</div>
							<div className="popBox_item form-group">
								{pageid && <BannerModal selectbanners={data} addBanner={addBanner} />}
								
							</div>
							
							
							
							

              
            </div>

          </div>

        </div>
        
      </div>
      <div className="row">
        <div className="col-12">
          <a onClick={router.back} className="btn btn-secondary">Cancel</a>
					
					<input type="submit"  value="Сохранить" className="btn btn-success float-right"/>
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
export default GroopsBannerFrom
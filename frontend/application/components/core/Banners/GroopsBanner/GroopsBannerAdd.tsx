import { adapterComponentUseCase } from "adapters/adapterComponents"
import { bannerCategory } from "application/contstans/banners.const"
import { useGroopsBanner } from "domains/useCase/banners/useCase.GroopsBanner"

const GroopsBannerAdd = () =>{
	const useCasePoints = adapterComponentUseCase(useGroopsBanner)
	const {pageid,data} = useCasePoints.data
	const {register,handleSubmit,onSubmit,router,onDelet} = useCasePoints.handlers

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
				            <input type="text" {...register('name')}  name="name" className="form-control" />
				        </div>
								<div className="popBox_item form-group">
										<label className="form-label">Категория</label><br />
				            <select {...register('category')} name="category">
											<option selected={data && data.category === bannerCategory.default}>{bannerCategory.default}</option>
											<option selected={data && data.category === bannerCategory.delivery}>{bannerCategory.delivery}</option>
											<option selected={data && data.category === bannerCategory.menu}>{bannerCategory.menu}</option>
										</select>
								</div>
							<div className="popBox_item form-group">
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
export default GroopsBannerAdd

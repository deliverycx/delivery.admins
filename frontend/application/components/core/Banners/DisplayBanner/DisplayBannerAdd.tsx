import { adapterComponentUseCase } from "adapters/adapterComponents"
import FormSelectOrganization from "application/components/common/Form/FormSelectOrganization"
import { useDisplayBannerFrom } from "domains/useCase/banners/useCase.DisplayBanner"

const DisplayBannerAdd = () =>{
	const useCasePoints = adapterComponentUseCase(useDisplayBannerFrom)
	const {pageid} = useCasePoints.data
	const {handleSubmit,onSubmit,router,onDelet,handlSelectOrg} = useCasePoints.handlers

	
	return(
		<form onSubmit={handleSubmit(onSubmit)}>
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Добавить организацию в отоброжение баннеров</h3>
							<div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
						<div className="card-body">
						<FormSelectOrganization  setter={handlSelectOrg} />
							
							
							
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
export default DisplayBannerAdd
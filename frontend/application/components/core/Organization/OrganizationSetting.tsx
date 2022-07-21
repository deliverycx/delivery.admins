import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationSetting } from 'domains/useCase/organization/useCase.OrganizationSetting';

const OrganizationSetting = () =>{
	const useCasePoints = adapterComponentUseCase(useOrganizationSetting)
	const {organization,social,slideId} = useCasePoints.data
	const {setInput,onSubmit,handleReserveTable} = useCasePoints.handlers
	

	return(
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Соц сети</h3>
            </div>
            <div className="card-body">
						<div className="form-group">
							<div className="popBox_item col-3"> 
			            <label className="form-label">VK</label>
			            <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue={social ? social.social && String(social.social.vk) : ' '} className="form-control" />
			        </div>
						</div>
						<input type="submit" value="Сохранить" onClick={onSubmit} className="btn btn-success"/>
              
            </div>

          </div>


					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Таргет ссылка</h3>
            </div>
            <div className="card-body">
							<span>https://тест.хинкалыч.рф/?organuzation={slideId}</span>
              
            </div>

          </div>


					<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Заказать столик</h3>
            </div>
            <div className="card-body">
							
							
							<input
								id="tablefalse"
	              type="radio"
	              value="false"
	              checked={organization && organization.reservetable == false}
	              onChange={handleReserveTable}
	            />
							<label htmlFor="tablefalse">Скрыть</label>
							<br />
							
							<input
								id="tabletrue"
	              type="radio"
	              value="true"
	              checked={organization && organization.reservetable == true}
	              onChange={handleReserveTable}
	            />
              <label htmlFor="tabletrue">Показать</label>

            </div>

          </div>

					

        </div>
        
      </div>
      
    </section>

	)
}
export default OrganizationSetting
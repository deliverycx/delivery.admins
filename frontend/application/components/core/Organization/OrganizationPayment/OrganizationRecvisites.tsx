import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modal from "application/components/common/Modal/Modal"
import { useOrganizationPayMaster, useOrganizationRecvisites } from "domains/useCase/organization/useCase.OrganizationPayment"
import { FC, memo } from "react"

const OrganizationRecvisites:FC<{id:string}> = ({id}) => {
	const useCase = adapterComponentUseCase(useOrganizationRecvisites,id)
	const {info,modal} = useCase.data
	const {setModal,handleSubmit,register,onSubmit} = useCase.handlers

	return (
		<>
			<button type="button" className="btn btn-block btn-default col-md-2" onClick={()=> setModal(true)}>Реквизиты</button>
			{
				modal &&
				<Modal setter={setModal} >
					<form onSubmit={handleSubmit(onSubmit)}>
						<section className="content">
				      <div className="row">
				        <div className="col-md-12">
				          <div className="card card-primary">
				            <div className="card-header">
				              <h3 className="card-title">Добавить Реквизиты</h3>

				              <div className="card-tools">
				                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
				                  <i className="fas fa-minus"></i>
				                </button>
				              </div>
				            </div>
				            <div className="card-body">
												<div className="popBox_item form-group"> 
								            <label className="form-label">Название</label>
								            <input type="text" {...register('name')} defaultValue={info && info.name} name="name" className="form-control" />
								        </div>
												<div className="popBox_item form-group"> 
								            <label className="form-label">ОРГН</label>
								            <input type="text" {...register('ogrn')} defaultValue={info && info.ogrn} name="ogrn" className="form-control" />
								        </div>
												<div className="popBox_item form-group"> 
								            <label className="form-label">ИНН</label>
								            <input type="text" {...register('inn')} defaultValue={info && info.inn} name="inn" className="form-control" />
								        </div>
											
											
											
											<div className="popBox_item form-group">
												
												
											</div>
				            </div>

				          </div>

				        </div>
				        
				      </div>
				      <div className="row">
				        <div className="col-12">
				          
									
									<input type="submit"  value="Сохранить" className="btn btn-success float-right"/>
									
									
				        </div>
								
				      </div>
				    </section>
						</form>
				</Modal>
			}
			
			
		</>
	)
}
export default memo(OrganizationRecvisites)
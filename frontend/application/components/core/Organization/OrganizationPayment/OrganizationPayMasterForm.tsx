import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modal from "application/components/common/Modal/Modal"
import { useOrganizationPayMaster } from "domains/useCase/organization/useCase.OrganizationPayment"
import { FC, memo } from "react"

const OrganizationPayMaster:FC<{paymodal:any,settermodal:any,id:string}> = ({paymodal,settermodal,id}) => {
	const useCase = adapterComponentUseCase(useOrganizationPayMaster,{paymodal,id})

	const {setModal,handleSubmit,register,onSubmit} = useCase.handlers


	const info = paymodal.pay
	console.log(info);

	return (
		<>
			<button type="button" className="btn btn-block btn-default col-md-2" onClick={()=> settermodal((prev:any)=> {
					return {
						...prev,
						modal:true
					}
				})} >Добавить PayMaster</button>
			{
				paymodal.modal &&
				<Modal setter={()=> settermodal((prev:any)=> {
					return {
						...prev,
						modal:false
					}
				})} >
					<form onSubmit={handleSubmit(onSubmit)}>
						<section className="content">
				      <div className="row">
				        <div className="col-md-12">
				          <div className="card card-primary">
				            <div className="card-header">
				              <h3 className="card-title">Добавить данные организации PayMaster</h3>

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
								            <label className="form-label">Токен</label>
								            <input type="text" {...register('token')} defaultValue={info && info.token} name="token" className="form-control" />
								        </div>
												<div className="popBox_item form-group"> 
								            <label className="form-label">ИД организации(магазин)</label>
								            <input type="text" {...register('merchantId')} defaultValue={info && info.merchantId} name="merchantId" className="form-control" />
								        </div>
												<div className="popBox_item form-group"> 
													<label className="form-label">Тип</label>
													<select name="typemagaz" {...register('typemagaz')}>
														<option value="ip">ИП</option>
														<option value="ooo">ООО</option>
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
export default memo(OrganizationPayMaster)
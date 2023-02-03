import Modal from "application/components/common/Modal/Modal"
import { info } from "console"
import { useContext } from "react"
import { OrganizationUsersContext } from "./OrganizationUsers"

const OrganizationUsersAdd = () =>{
	const useCase = useContext(OrganizationUsersContext)
	const {modal,users} = useCase.data
	const {setModal,handleSubmit,register,onSubmit,onChangeUser} = useCase.handlers

	console.log(modal);
	return (
		<>
			<div className="organization_control">
								<div className="col-2 btn btn-primary" onClick={()=> setModal(true)}>Добавить админа</div>
								<div className="col-2 btn btn-primary">Добавить офицанта</div>
							</div>
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
								            <label className="form-label">Логин</label>
								            <input type="text" {...register('name')} defaultValue={users && users.name} name="name" className="form-control" />
								        </div>
												<div className="popBox_item form-group"> 
								            <label className="form-label">Пароль</label>
								            <input type="text" {...register('password')} defaultValue={users && users.password} name="password" className="form-control" />
								        </div>
												<select onChange={onChangeUser}>
													<option value="admin">Администратор</option>
													<option value="ofic">Офицант</option>
												</select>
											
											
											
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
export default OrganizationUsersAdd
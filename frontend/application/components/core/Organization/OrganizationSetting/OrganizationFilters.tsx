import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationFilter } from 'domains/useCase/organization/useCase.OrganizationFilter';
import { DropzoneArea } from 'material-ui-dropzone';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from "classnames";

const OrganizationFilters: FC<{ organization: any,refresh:any }> = ({ organization,refresh }) => {

	const useCase = adapterComponentUseCase(useOrganizationFilter, organization)
	const { file, imagesArr, filters, modal } = useCase.data
	const { setFile, onSubmit, setModal,handlerAddfilter } = useCase.handlers


	const { register, handleSubmit } = useForm<{ name: any }>();

	return (

		<div className="card card-primary">
			<div className="card-header">
				<h3 className="card-title">Фильтр</h3>
			</div>
			<div className="card-body">
				<div className="form-group"></div>
				<button type="button" className="btn btn-block btn-default col-md-2" onClick={() => setModal(true)}>Добавить фильтр</button>
				{modal &&
					<div className="modal_box">
						<div className="modal_overfloy" onClick={() => setModal(false)}></div>
						<div className="col-md-8 modales">
							<div className="card card-warning">
								<div className="card-header">
									<h3 className="card-title">Добавить фильтр</h3>

									<div className="card-tools">
										<button type="button" className="btn btn-tool" data-card-widget="remove" onClick={() => setModal(false)}>
											<img src="/img/close.png" />

										</button>
									</div>

								</div>

								<form onSubmit={handleSubmit(onSubmit)}>
									<section className='content'>
										<div className='row'>
											<div className='col-md-12'>
												<div className='card card-primary'>

													<div className='card-body'>
														<div className="popBox_item form-group">
															<label className="form-label">Название</label>
															<input type="text" {...register('name')} name="name" className="form-control" />
														</div>
														<div className='popBox_item'>
															<label className='form-label'>фото в организации</label>
															<DropzoneArea onChange={e => setFile(e)} filesLimit={1}

															/>
														</div>
														<input type='submit' value='Добавить фото' className='btn btn-success float-right' />
													</div>

												</div>

											</div>
										</div>
									</section>
								</form>

							</div>

						</div>
					</div>
				}
				<br />
				<h4>Список активныйх фильров</h4>
				<div className='col-md-12'>
					<div className='card card-primary'>
						<div className='card-body'>

							<div className="row">


								{
									filters && filters.length !== 0 &&
									filters.map((val: any) => {
										const inc = organization.filters &&  organization.filters.map((e:any) => e._id).includes(val._id)
										
										const CN = cn("btn btn-app btn-sm col-2", { "bg-success": inc });
										return <button key={val._id} onClick={ async ()=> {
											await handlerAddfilter(val)
											refresh(organization.id)
										} } className={CN}>
											<img src={imagesArr(val.images)} />
											{val.name}
										</button>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default OrganizationFilters
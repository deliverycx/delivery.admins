import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCaseUpload } from "domains/useCase/upload/useCase.Upload"
import cn from "classnames"

const UploadOrganization = () => {
	const useCaseUploads = adapterComponentUseCase(useCaseUpload)
	const { organizations, organizationInfo, urlhooks, loading } = useCaseUploads.data
	const { getIIkkoInfoOrg, poolingOrganization, setUrlhooks, updateIikkoHooks } = useCaseUploads.handlers

	return (
		<>
			{
				organizations &&
				organizations
					.sort((val: any) => val.new)
					.map((org: any, index: number) => {

						if (org) {
							const CN = cn('card', { "callout callout-success card-success": !org.new })
							return (
								<>
									<div key={index} className={CN}>
										<div className="card-header">
											<h3 className="card-title">{org.name}  <span> - {org.id}</span></h3>

										</div>
										{
											loading &&
											<div className="overlay dark">
												<i className="fas fa-2x fa-sync-alt"></i>
												<span className="overlay_loading">Загрузка</span>
											</div>
										}

										<div className="card-body">
											{


											}
											<div className="row">
												<div className="card col-sm-6">
													<div className="card-header">
														<h4 className="card-title w-100">Инфо о точке  <button onClick={() => getIIkkoInfoOrg(org.id)} className="btn btn-light">показать</button></h4>
													</div>
													<div className="card-body">
														{
															organizationInfo && organizationInfo.organizationid === org.id &&
															<ul>

																<li>id терминала - {organizationInfo.idtermital}</li>
																<li>адрес - {organizationInfo.adress}</li>

															</ul>
														}
														{
															typeof organizationInfo === 'boolean' &&
															<span>Ошибка в айко, адрес не заполненили или нету терминала</span>
														}

													</div>
												</div>
												

											</div>
											<div className="card-footer">
												<div className="row">
													<button onClick={() => poolingOrganization(org.id)} className="col-2 btn btn-success">выгрузка на сайт</button>
													<section className="col-6">
														<div className="row">
															<div className="col-3 input-group">
																<input type="text" className="form-control" value={urlhooks} onChange={e => setUrlhooks(e.target.value)} />
															</div>
															<span className="input-group-append">
																<button onClick={() => updateIikkoHooks(org.id)} className="btn btn-warning">обновить хуки</button>
															</span>
															
														</div>
													</section>
												</div>

											</div>
										</div>
									</div>
								</>
							)
						}


					})
			}
		</>
	)
}
export default UploadOrganization
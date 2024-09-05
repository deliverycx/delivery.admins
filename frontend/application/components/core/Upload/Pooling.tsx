import { adapterComponentUseCase } from "adapters/adapterComponents"
import Modal from "application/components/common/Modal/Modal"
import { useCasePooling } from "domains/useCase/upload/useCase.Pooling"
import { useState } from "react"

const Pooling = () => {
	const useCasePoints = adapterComponentUseCase(useCasePooling)
	const { startPolling, modalSku } = useCasePoints.handlers
	const { statupool, poolError, setSku, setModalSku } = useCasePoints.status

	const [modal, setModal] = useState(false)

	return (
		<div className="card">
			<div className="card-header">
				<h1 className="m-0">Обновление Айко</h1>
			</div>

			<div className="card-body">
				<div className="row">
					<label>артикул</label>
					<input type="text" onChange={e => setSku(e.target.value)} />
				</div>
				<br />
				<button
					type="button"
					className="btn btn-block btn-dark btn-lg col-md-3"
					onClick={() => startPolling()}
				>
					Обновить Меню
				</button>
				{
					modalSku && <button className="btn btn-block btn-md col-md-3" onClick={() => setModal(true)}>показать список цен</button>
				}
			</div>


			{
				modal &&
				<Modal setter={() => setModal(false)}>
					<div className="card-body">
						<table cellPadding={15}>
							<thead>
								<th scope="col">организация</th>
								<th scope="col">название блюда</th>
								<th scope="col">цена</th>
								<th scope="col">артикул</th>
							</thead>
							<tbody>
								{
									modalSku && modalSku.length !== 0 &&
									modalSku.map((value: any) => {
										return (
											<tr>
												<td>{value.oraganization}</td>
												<td>{value.name}</td>
												<td>{value.price}</td>
												<td>{value.sku}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</Modal>
			}

			<div className="card-body">
				{
					poolError === true &&
					<div className="alert alert-danger alert-dismissible">
						<h5>
							<i className="icon fas fa-ban"></i> Ошибка при обновлении
						</h5>
					</div>
				}
				{
					poolError === false &&
					<div className="alert alert-success alert-dismissible">
						<h5>
							<i className="icon fas fa-check"></i> Обновление прошло успешно
						</h5>
					</div>
				}

				{
					statupool &&
					<div className="alert alert-info alert-dismissible">
						<h5><i className="icon fas fa-info"></i>Идет Обновление</h5>
					</div>
				}

			</div>
		</div>
	)
}
export default Pooling
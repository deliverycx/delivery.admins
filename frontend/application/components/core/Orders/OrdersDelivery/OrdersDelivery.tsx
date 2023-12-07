import React, { FC, useState } from "react";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderDelivery } from "domains/useCase/orders/useCase.OrdersDelivery";
import OrdersDeliveryList from "./OrdersDeliveryList";

type IProps = {
	organization: string | undefined;
};

const OrdersDelivery: FC<IProps> = ({ organization }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const ordersPerPage = 90;

	const useCase = adapterComponentUseCase(useOrderDelivery, organization);
	const { orderList } = useCase.data;
	const { handlerLimit, getOrders, handlerBuErrors, handleByCard } = useCase.handlers;

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = orderList?.slice(indexOfFirstOrder, indexOfLastOrder);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="card card-primary">
				<div className="card-header">
					<h4 className="card-title">Фильтр</h4>
				</div>
				<div className="card-body">
					<div className="form-group filtersdisplay">
						<div className="row">
							<div className="col-3">
								<h5>Показать количество на странице</h5>
								<hr />
								<span className="filter_items" onClick={() => handlerLimit(30)}>30</span>
								<span className="filter_items" onClick={() => handlerLimit(60)}>60</span>
								<span className="filter_items" onClick={() => handlerLimit(90)}>90</span>
							</div>
							<div className="col-3">
								<h3>Фильтр</h3>
								<hr />
								<div className="filter_items">
									<span style={{ cursor: 'pointer' }} onClick={handlerBuErrors}>Показать с ошибками</span>
									<img style={{ cursor: 'pointer' }} width="15" height="15" className="cansel" src="/img/cansel.png" onClick={() => getOrders(organization, 30)} />
								</div>
								<div className="filter_items">
									<span style={{ cursor: 'pointer' }} onClick={handleByCard}>Показать оплаты картой</span>
									<img style={{ cursor: 'pointer' }} width="15" height="15" className="cansel" src="/img/cansel.png" onClick={() => getOrders(organization, 30)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<table className="table table-striped projects">
				<thead>
				<tr>
					<th className="text-center">статус заказа</th>
					<th className="text-center">id заказа</th>
					<th className="text-center">номер заказа</th>
					<th className="text-center">точка</th>
					<th className="text-center">адресс/время</th>
					<th className="text-center">телефон</th>
					<th className="text-center">сумма</th>
				</tr>
				</thead>
				<tbody>
				{currentOrders &&
					currentOrders.map((val: any) => {
						return <OrdersDeliveryList key={val._id} orderList={val} />;
					})}
				</tbody>
			</table>

			<ul className="pagination">
				{Array.from({ length: Math.min(Math.ceil(orderList?.length / ordersPerPage), 10) }, (_, index) => (
					<li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
            <span className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </span>
					</li>
				))}
			</ul>
		</>
	);
};

export default OrdersDelivery;

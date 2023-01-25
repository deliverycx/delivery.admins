import { FC } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderPaymentCart } from "domains/useCase/orders/useCase.OrderPayment";
import { OrderStatus, PaymentStatuses } from "application/contstans/order.const";
import { IorderItems, IOrderPayment } from "@type";


const OrderPaymentCart:FC<{id:string}> = ({id}) =>{
	const useCase = adapterComponentUseCase(useOrderPaymentCart,id)
	const {data,statePaymentItem} = useCase.data
	const {handlerReturns,refresh,onDelet} = useCase.handlers
	const order:IOrderPayment =  data

	return (
		<div className="content-wrapper">
    
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Детали платежа</h1>
          </div>
          
        </div>
      </div>
    </section>

    {
			order &&
		
    <section className="content">

      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">ИД оплаты - <strong>{order.paymentid}</strong></h3>
					<br />
					{
						statePaymentItem.errors &&
						<span><strong>ошибка</strong> - {statePaymentItem.errors}</span>
					}
          <div className="card-tools">
								<a className="btn btn-sm btn-primary" onClick={refresh} >обновить</a>
								{
									PaymentStatuses.Return !== order.paymentStatus &&
									<button className="btn btn-sm btn-warning" disabled={statePaymentItem.retunrs} onClick={()=> handlerReturns(order)}>возврат</button>
								}
                
								<a className="btn btn-danger btn-sm" onClick={()=> onDelet(order._id)}>удалить</a>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Сумма оплаты</span>
                      <span className="info-box-number text-center text-muted mb-0">{order.paymentAmount}p</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Статус оплаты</span>
                      <span className="info-box-number text-center text-muted mb-0">
													{
														PaymentStatuses.AUTHORIZED === order.paymentStatus &&
														<span className="badge badge-success">холдирование</span>
													}
													{
														
														PaymentStatuses.Return === order.paymentStatus &&
														<span className="badge badge-warning">возврат</span>
													}
													{
														
														PaymentStatuses.REJECTED === order.paymentStatus &&
														<span className="badge badge-danger">отмена</span>
													}
											</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Статус заказа</span>
                      <span className="info-box-number text-center text-muted mb-0">{OrderStatus[order.orderStatus]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4>Товары</h4>
										{
											/**/
											order.orderItems.map((item:IorderItems) =>{
												return (
													<>
													<div key={item.product.id} className="post">
													<ul className="list-unstyled">
						                <li>
						                  <small>Название:</small> {item.product.name}
						                </li>
						                <li>
														<	small>цена:</small> {item.price}
						                </li>
						                <li>
															<small>сумма:</small> {item.cost}p
						                </li>
						                <li>
															<small>количество:</small> {item.amount}
						                </li>
						                
						              </ul>
                    			</div>
													</>
												)
											})
											
										}
                    

                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
              <h3 className="text-primary"><i className="fas fa-paint-brush"></i> {statePaymentItem.organization && statePaymentItem.organization}</h3>
              
              <div className="text-muted">
								<p className="text-sm">ИД заказа
                  <b className="d-block">{order.orderId}</b>
                </p>
                <p className="text-sm">сумма в заказе
                  <b className="d-block">{order.orderAmount}p <small>(без учета доставки 150р)</small> </b>
                </p>
                <p className="text-sm">ИД магазина(точки)
                  <b className="d-block">{order.merchantId}</b>
                </p>
								<p className="text-sm">Номер карты плательщика
                  <b className="d-block">{order.paymentData.paymentInstrumentTitle}</b>
                </p>
              </div>

              <h5 className="mt-5 text-muted">Информация о заказе</h5>
              <ul className="list-unstyled">
                <li>
                  <small>адресс:</small> {`${order.paymentparams.address_city}, ${order.paymentparams.address_street}, ${order.paymentparams.address_home}`}
                </li>
                <li>
								<	small>тип заказа:</small> {order.paymentparams.orderType}
                </li>
                <li>
									<small>телефон:</small> {order.paymentparams.phone}
                </li>
                <li>
									<small>дата:</small> {order.paymentparams.date}
                </li>
                
              </ul>
              
            </div>
          </div>
        </div>
        
      </div>
      

    </section>
		}
  </div>
	)
}
export default OrderPaymentCart
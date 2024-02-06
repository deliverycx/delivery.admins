import { FC } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderPaymentCart } from "domains/useCase/orders/useCase.OrderPayment";
import { OrderStatus, PaymentStatuses } from "application/contstans/order.const";
import { IorderItems, IOrderPayment } from "@type";
import { FormikProvider, useFormik } from "formik";


const OrderPaymentCart:FC<{orderid:string,payment:any}> = ({orderid,payment}) =>{
	const useCase = adapterComponentUseCase(useOrderPaymentCart,{orderid,payment})
	const {statePaymentItem} = useCase.data
	const {handlerReturns,canselPayment,successPayment,refresh} = useCase.handlers
	const order =  statePaymentItem.order

	const initialValues = {
		orderPrice:''
	}
	const formik = useFormik({
    initialValues,
    onSubmit: async (values, meta) => {
			successPayment(order.paymentid,Number(values.orderPrice))
    },
  });
	
	return (
		<div className="content-wrapper">
    
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Детали Платежа</h1>
          </div>
          
        </div>
      </div>
    </section>

    {
			order &&
		
    <section className="content">

      
      <div className="card">
        
        <div className="card-body">
				<div className="">
						<span><svg version="1.1" width="16" height="16" viewBox="0 0 16 16">
<path fill="#444444" d="M9 10h-2c0-2 1.2-2.6 2-3 0.3-0.1 0.5-0.2 0.7-0.4 0.1-0.1 0.3-0.3 0.1-0.7-0.2-0.5-0.8-1-1.7-1-1.4 0-1.6 1.2-1.7 1.5l-2-0.3c0.1-1.1 1-3.2 3.6-3.2 1.6 0 3 0.9 3.6 2.2 0.4 1.1 0.2 2.2-0.6 3-0.4 0.4-0.8 0.6-1.2 0.7-0.6 0.4-0.8 0.2-0.8 1.2z"></path>
<path fill="#444444" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
<path fill="#444444" d="M6.9 11h2v2h-2v-2z"></path>
</svg></span> подробней о платежах в <a href="/managers/notification"><strong>в справочной</strong></a>
					</div>
					<hr />
					

					<div className="card-header">
						<section>
								<h3 className="card-title">Платеж заказа - <strong>{order.paymentid}</strong></h3>
								
							</section>
							<div className="card-tools cardlefttoll">
									
									<a className="btn  btn-success" onClick={() => successPayment(order.paymentid,order.paymentAmount)} >подтвердить</a>
									{
										false && PaymentStatuses.Return !== order.paymentStatus &&
										<button className="btn btn-sm btn-warning" disabled={statePaymentItem.retunrs} onClick={()=> handlerReturns(order)}>возврат</button>
									}
	                
									<a className="btn btn-danger " onClick={()=> canselPayment(order.paymentid)}>отменить</a>
									
	          </div>	
						{
							/**
							 * <section className="sm-4 float-right chastplatej">
								<label className='form-label'>Частичное списание платежа</label>
								<FormikProvider value={formik}>
								<form onSubmit={formik.handleSubmit}>
									
									<div className='popBox_item col-6 float-left'>
	                 
	                  <input type='text'  name='orderPrice' className='form-control' onChange={formik.handleChange} />
	                </div>
									<input type="submit"  className='btn btn-success float-right col-6' value="подтвердить" />
								</form>
								</FormikProvider>
								</section>
							 */
						}
						
					</div>
					
					<div className="row">
                <div className="col-12 col-sm-3">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Сумма оплаты</span>
                      <span className="info-box-number text-center text-muted mb-0">{order.paymentAmount}p</span>
                    </div>
                  </div>
                </div>
								
                <div className="col-12 col-sm-3">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Статус оплаты</span>
                      <span className="info-box-number text-center text-muted mb-0">
													{
														PaymentStatuses.SUCCESSED === order.paymentStatus &&
														<span className="badge badge-success">Оплачено</span>
													}
													{
														
														PaymentStatuses.AUTHORIZED === order.paymentStatus &&
														<span className="badge badge-warning">холдирование</span>
													}
													{
														
														PaymentStatuses.CANCELLED === order.paymentStatus &&
														<span className="badge badge-danger">отменен</span>
													}
											</span>
                    </div>
                  </div>
                </div>
                
              </div>
        </div>
        
      </div>

			{
				/*
				order.dyalPayment.BarPaymentid && statePaymentItem.tokenBar &&
				<div className="card">
					<div className="card-header">
						<div className="user-block">
							<section>
								<h3 className="card-title">Платеж Бара - <strong>{order.dyalPayment.BarPaymentid}</strong></h3>
								<br />
								
								{
									statePaymentItem.errors &&
									<span><strong>ошибка</strong> - {statePaymentItem.errors}</span>
								}
							</section>

						</div>
	          
	          <div className="card-tools">
									<a className="btn btn-success" onClick={() => successPayment(order.dyalPayment.BarPaymentid,Number(order.dyalPayment.BarPaymentAmount),statePaymentItem.tokenBar)} >подтвердить</a>
									{
										false && PaymentStatuses.Return !== order.paymentStatus &&
										<button className="btn btn-sm btn-warning" disabled={statePaymentItem.retunrs} onClick={()=> handlerReturns(order)}>возврат</button>
									}
	                
									<a className="btn btn-danger" onClick={()=> canselPayment(order.dyalPayment.BarPaymentid,statePaymentItem.tokenBar)}>отменить</a>
	          </div>
	        </div>
					<div className="card-body">
						<div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
							<div className="row">
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Сумма оплаты</span>
                      <span className="info-box-number text-center text-muted mb-0">{order.dyalPayment.BarPaymentAmount}p</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Статус оплаты</span>
											{
												statePaymentItem.barPayment &&
												<span className="info-box-number text-center text-muted mb-0">
														{
															PaymentStatuses.AUTHORIZED === statePaymentItem.barPayment.status &&
															<span className="badge badge-warning">холдирование</span>
														}
														{
															PaymentStatuses.SUCCESSED === statePaymentItem.barPayment.status &&
															<span className="badge badge-success">Оплачено</span>
														}
														{
															
															PaymentStatuses.CANCELLED === statePaymentItem.barPayment.status &&
															<span className="badge badge-danger">отменен</span>
														}
												</span>
											}
                      
                    </div>
                  </div>
                </div>
                
              </div>
						</div>
					</div>
				</div>
				*/
			}
			
      

    </section>
		}
  </div>
	)
}
export default OrderPaymentCart
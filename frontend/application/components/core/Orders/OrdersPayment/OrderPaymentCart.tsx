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
import { FC, useEffect, useState } from "react"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderPaymentCart } from "domains/useCase/orders/useCase.OrderPayment";
import { OrderCreationStatus, OrderStatus, PaymentStatuses } from "application/contstans/order.const";
import { IorderItems, IOrderPayment } from "@type";
import { FormikProvider, useFormik } from "formik";
import RequestOrdersDelivery from "servises/repository/Axios/Request/Request.OrdersDelivery";
import OrderPaymentCart from "../OrdersPayment/OrderPaymentCart";


const OrderDeliveryCart:FC<{id:string}> = ({id}) =>{
	const [order,setOrder] = useState<any>()

	const getOrder = async () =>{
		try {
			const {data} = await RequestOrdersDelivery.getOrderBu(id)
			if(data){
				setOrder(data)
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		id && getOrder()
	},[id])

	console.log(order);

	const orderCreationStatusTSX = () =>{
		switch(order.orderStatus){
			case OrderCreationStatus.ERROR
				: return <span className="badge badge-danger">Ошибка</span>
			case OrderCreationStatus.PROGRES
				: return <span className="badge badge-warning">В обработке</span>
			case OrderCreationStatus.SUCCESS
				: return <span className="badge badge-success">Завершен</span>	
			default
				: return <span className="badge">Неизвестен</span>
		}
	}
	
	return (
		<div className="content-wrapper">
    
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Детали заказа</h1>
          </div>
          
        </div>
      </div>
    </section>

    {
			order &&
		
    <section className="content">
			<div className="col-12 col-sm-3">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Статус заказа</span>
                      <span className="info-box-number text-center text-muted mb-0">{orderCreationStatusTSX()}</span>
                    </div>
                  </div>
                </div>
      
      <div className="card">
        <div className="card-header">
					{
							order.orderParams &&
<div className="user-block">
						<h5 className="mt-5 text-muted">Информация о заказе - {order.orderNumber}</h5>
              <ul className="list-unstyled">
                <li>
									{
										order.orderParams.address &&
										<>
											<small>адресс:</small> {`${order.orderParams.address.city}, ${order.orderParams.address.street}, ${order.orderParams.address.home} (kladr:${order.orderParams.address.kladrid})`}
										</>
									}
                  
                </li>
                <li>
								<	small>тип заказа:</small> {order.orderParams.orderType}
                </li>
                <li>
									<small>телефон:</small> {order.orderParams.phone}
                </li>
                <li>
									<small>дата:</small> {order.orderParams.date}
                </li>
                <li>
									<small>код ошибки:</small> {JSON.stringify(order.orderError)}
                </li>
              </ul>

					</div>
						}
					
          
          
					<div className="clearfix"></div>
					
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
              
              <div className="row">
                <div className="col-12">
                  <h4>Товары</h4>
										{
											/**/
											order.orderItems.map((item:any) =>{
												return (
													<>
													<div key={item.id} className="post">
													<ul className="list-unstyled">
						                <li>
						                  <small>Название:</small> {item.productName}
						                </li>
						                <li>
														<	small>цена:</small> {item.oneprice}
						                </li>
						                <li>
															<small>сумма:</small> {item.price}p
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
              
              <div className="text-muted">
								<p className="text-sm">ИД заказа
                  <b className="d-block">{order.orderId}</b>
                </p>
               
							
              </div>

              
              
            </div>
          </div>
					<hr />
					

					
					
					
        </div>
        
      </div>

			
			{
				order.payment &&
				<OrderPaymentCart orderid={id} payment={order.payment} />
			}
      

    </section>
		}
  </div>
	)
}
export default OrderDeliveryCart
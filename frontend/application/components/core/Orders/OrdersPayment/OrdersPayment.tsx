import React, { useEffect, useState } from "react";
import RequestOrderPayment from "servises/repository/Axios/Request/Request.OrderPayment";
import OrderPaymentItem from "./OrderPaymentItem";

const OrdersPayment = () =>{
	const [orders,setOrders] = useState<any>(null)
	useEffect(()=>{
		getAll()

	},[])

	const getAll = async () =>{
		try {
			const {data} = await RequestOrderPayment.CRUDFabric.getAll()
			console.log(data);
			data && setOrders(data)
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
		<section className="content-header">
	      <div className="container-fluid">
	        <div className="row mb-2">
	          <div className="col-sm-6">
	            <h1>Projects</h1>
	          </div>
	          
	        </div>
	      </div>
	    </section>
			<section className="content">


      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Заказы с оплатой карты</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped projects">
              <thead>
                  <tr>
                      <th >
                          номер платежа
                      </th>
                      <th >
                          сумма
                      </th>
                      <th >
                          точка
                      </th>
                      <th className="text-center">
                          статус оплаты
                      </th>
                      <th  className="text-center">
                          статус заказа
                      </th>
                      
                  </tr>
              </thead>
              <tbody>
							{
								orders && orders.map((order:any)=>{
									return <OrderPaymentItem key={order._id} order={order} />
								})
								
							}
							
                  
              </tbody>
          </table>
        </div>
      
      </div>
    
    </section>
		</>
		
	)
}
export default OrdersPayment
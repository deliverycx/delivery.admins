import { Injectable, Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { orderPaymentRepository } from "../repository/orderPayment.repository";
import axios, { AxiosInstance } from "axios";
import { Axios } from "src/application/repository/axios";

@Injectable()
export class orderPaymentServises extends BaseServises{
	constructor(
		@Inject(orderPaymentRepository)
		private readonly Repository
	) {
		super(Repository);
		
	}

	async returnPamyMent({token,order}){
		try {
			const pay = await this.metodReturnPamyMent(token,order)
			return this.statusReturnPamyMent(token,order,pay.id)
		} catch (error) {
			console.log(error);
			return {
				error:'ошибка в возврате'
			}
		}
		
	}

	async statusReturnPamyMent(token:string,order:any,id:string){
		const statuspay = await this.repeatReturnUntilSuccess(token,id)
		if(statuspay.status === 'Success'){
			await this.Repository.setReturnPayment(order.paymentid,'Return')
		}else if(statuspay.status === 'Rejected'){
			await this.Repository.setReturnPayment(order.paymentid,'Rejected')
		}
		return statuspay
	}

	async metodReturnPamyMent(token:string,order:any){
		const {data} = await axios.post(
			'https://paymaster.ru/api/v2/refunds',
			{
				"paymentId": String(order.paymentid),
				"amount": {
					"value": Number(order.paymentAmount),
					"currency": "RUB"
				}
			},
				{
					headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json" 
					}
			}
		)
		console.log(data);
		return data
	}

	async metodReturnPamyMentStatus(token:string,id:string){ 
		const {data} = await axios.get(
			`https://paymaster.ru/api/v2/refunds/${id}`,
				{
					headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json" 
					}
			}
		)
		console.log(data);
		return data
	}


	async repeatReturnUntilSuccess(token:string,id:string,counter?:number):Promise<any> {
		counter = counter || 0;
		let tik:any
		console.log('count',counter,tik);
		return new Promise(async (resolve, reject) => {
				try {
						
						const result = await this.metodReturnPamyMentStatus(token,id)

						if (result.status === 'Pending') {
								
								
								if (counter >= 3) {
									
									resolve(result);

									
							} else {
									tik = setTimeout(async () => {
											resolve(
													await this.repeatReturnUntilSuccess(token,id,counter + 1)
											);
									}, 5000);
							}
						}else if(result.status === 'Success'){
							
								resolve(result);
						}
						console.log('tik succ',tik);

						
				} catch (e) {
					console.log('catch');
						reject(
							new Error(
									"Возникла не предвиденная ошибка"
							)
						);
						
				}
		})
}
	
}
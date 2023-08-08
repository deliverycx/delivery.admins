import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { orderPaymentDTO } from "../dto/orderPayment.dto";
import { orderPaymentServises } from "../servises/orderPayment.servise";
import { response, Response } from "express";
import { ordersServises } from "../servises/orders.servise";
import { ordersDTO } from "../dto/orders.dto";

@Controller('orderDelivery')
export class ordersControllers{
  constructor(
    private readonly Servises: ordersServises
  ) { }

	
	@Get('buOrg')
	getAll(@Query() query: {organization:string,limit:number}){
		console.log(query);
		return this.Servises.getAllOrderMetod((query.organization !== 'undefined' && query) || {},query.limit)
	}
	@Get('buone')
	geBu(@Query() query: orderPaymentDTO){
		//console.log(query);
		return this.Servises.getOne(query)
	}
	@Get('buerrors')
	geBubuerrors(@Query() query: orderPaymentDTO){
		//console.log(query);
		return this.Servises.getAllOrderErrorsMetod()
	}
	@Post('mokorder')
	mokOrder(@Body() body: any){
		return this.Servises.mokOrderServises(body)
	}
	@Post('statusOrders')
	statusmokOrder(@Body() body: ordersDTO){
		return this.Servises.statusMokOrderServises(body)
	}
}
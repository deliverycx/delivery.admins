import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { orderPaymentDTO } from "../dto/orderPayment.dto";
import { orderPaymentServises } from "../servises/orderPayment.servise";
import { response, Response } from "express";
import { ordersServises } from "../servises/orders.servise";

@Controller('orderDelivery')
export class ordersControllers{
  constructor(
    private readonly Servises: ordersServises
  ) { }

	
	@Get('buOrg')
	getAll(@Query() query: {organization:string}){
		console.log(query.organization);
		return this.Servises.getAll((query.organization !== 'undefined') || {})
	}
	@Get('buone')
	geBu(@Query() query: orderPaymentDTO){
		console.log(query);
		return this.Servises.getOne(query)
	}
}
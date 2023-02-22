import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { orderPaymentDTO } from "../dto/orderPayment.dto";
import { orderPaymentServises } from "../servises/orderPayment.servise";
import { response, Response } from "express";

@Controller('orderPayment')
export class orderPaymentControllers{
  constructor(
    private readonly Servises: orderPaymentServises
  ) { }

	@Post('createOrderPayment')
	createOrderPayment(
		@Body() body:orderPaymentDTO
	){
		return this.Servises.create(body)
	}
	@Get('all')
	getAll(@Query() query: orderPaymentDTO){
		return this.Servises.getAll(query)
	}
	@Get('buone')
	geBu(@Query() query: orderPaymentDTO){
		return this.Servises.getOne(query)
	}

	@Post('returnPamyMent')
	async returnPamyMent(
			@Body() body:orderPaymentDTO,
			@Res() response: Response
		){
		try {
			const result = await this.Servises.returnPamyMent(body)
			response.status(200).json(result);
		} catch (error) {
			console.log(error);
			response.status(400).json({});
		}
	}

	@Post('statusPayment')
	statusPay(@Body() body:orderPaymentDTO){
		return this.Servises.statusPayment(body)
	}

	@Post('paymentConfirm')
	payconf(@Body() body:orderPaymentDTO){
		return this.Servises.payConfirm(body)
	}

	@Post('canselpayment')
	canselpay(@Body() body:orderPaymentDTO){
		return this.Servises.canselPayment(body)
	}

	@Post('statusReturn')
	statusreturnPamyMent(
		@Query() query: orderPaymentDTO,
		@Body() body:orderPaymentDTO,
		){
			return this.Servises.statusReturnPamyMent(body.token,body.order,query.id)
	}

	@Post('delet')
	async delete(
		@Query() query: orderPaymentDTO,
	){
		return this.Servises.delete(query.id)
	}
	
}
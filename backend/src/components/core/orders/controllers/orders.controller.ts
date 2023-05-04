import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { orderPaymentDTO } from "../dto/orderPayment.dto";
import { orderPaymentServises } from "../servises/orderPayment.servise";
import { response, Response } from "express";
import { ordersServises } from "../servises/orders.servise";

@Controller('orderPayment')
export class ordersControllers{
  constructor(
    private readonly Servises: ordersServises
  ) { }

	
	
}
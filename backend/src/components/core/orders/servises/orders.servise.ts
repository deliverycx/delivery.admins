import { Injectable, Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { ordersRepository } from "../repository/orders.repository";

@Injectable()
export class ordersServises extends BaseServises{
	constructor(
		@Inject(ordersRepository)
		private readonly Repository,


	) {
		super(Repository);
		
	}

	
}
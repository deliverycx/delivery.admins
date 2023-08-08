import { Inject, Injectable } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { OrganizationPaymentRepository } from "../repository/organizationPayment.repository";
import { OrganizationCounterRepository } from "../repository/organizationCounter.repository";

@Injectable()
export class OrganizationCountServises extends BaseServises{
  constructor(
		@Inject(OrganizationCounterRepository)
		private readonly Repository
	) {
		super(Repository);
	}
	

}
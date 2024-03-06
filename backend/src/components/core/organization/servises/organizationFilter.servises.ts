import { Injectable, Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { OrganizationPaymentRepository } from "../repository/organizationPayment.repository";
import { OrganizationFilterRepository } from "../repository/organizationFilter.repository";

@Injectable()
export class OrganizationFilterServises extends BaseServises{
  constructor(
		@Inject(OrganizationFilterRepository)
		private readonly Repository
	) {
		super(Repository);
	}
}
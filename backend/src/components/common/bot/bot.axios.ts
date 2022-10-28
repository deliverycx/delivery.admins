import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { ServiceUnavailableException } from "@nestjs/common";

@Injectable()
export class BotAxios {
    private axios: AxiosInstance;

    constructor() {
        this.init();
    }

    private init() {
        this.axios = axios.create({
            baseURL: process.env.BOT_URL
        });

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                throw new ServiceUnavailableException();
            }
        );
    }


		async ReturntPayment(
			organization: UniqueId,
			data:any
		): Promise<void> {
			console.log(process.env.BOT_URL);
				this.axios.post(`/return_payment/${organization}`, data);
		}

}


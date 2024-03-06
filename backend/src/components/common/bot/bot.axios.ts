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
				baseURL: process.env.BOT_URL,
				headers: {
					Authorization : `Bearer ${process.env.BOT_TOKEN}`
					}
		});

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
							console.log(error.response)
                //throw new ServiceUnavailableException();
            }
        );
    }


		async ReturntPayment(
			organization: string,
			data:any
		): Promise<void> {
				this.axios.post(`/return_payment/${organization}`, data);
		}

}


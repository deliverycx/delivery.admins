import axios, { AxiosInstance } from "axios";

export class Axios {
	public _axios: AxiosInstance;

	constructor(
			private readonly baseUrl: string,
			private readonly config?:{token:string} ,
			private readonly errorCallback?: any
	) {
			this.init();
	}

	private init() {
			const token = this.config.token ? {
				headers: {
					Authorization: `Bearer ${this.config.token}`,
					"Content-Type": "application/json" 
				}
			} : {}

			this._axios = axios.create({
					baseURL: this.baseUrl,
					...token
			}
			
			);

			this._axios.interceptors.response.use(
					(response) => response,
					(error) => {
							console.log(error);
							return Promise.reject(this.errorCallback(error));
					}
			);
	}
}
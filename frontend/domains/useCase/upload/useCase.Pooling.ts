import { RequestUpload } from "servises/repository/Axios/Request"
import { useState } from 'react';

export function useCasePooling(this: any) {
	const [statupool, setStatuspool] = useState(false)
	const [poolError, setPoolError] = useState<null | boolean>(null)
	const [sku, setSku] = useState('')
	const [modalSku, setModalSku] = useState<any[] | null>(null)

	const startPolling = async () => {
		try {
			setStatuspool(true)
			const result = await RequestUpload.Pooling({ sku })
			console.log(result.data.result)
			if (result.status === 200 && result.data.result) {
				setPoolError(false)
				result.data.result.length !== 0 && setModalSku(result.data.result)
			} else {
				setPoolError(true)
			}
			setStatuspool(false)
		} catch (error) {
			console.log(error)
			setStatuspool(false)
			setPoolError(true)
		}
	}

	this.data({

	})
	this.handlers({
		startPolling,
		modalSku
	})
	this.status({
		statupool,
		poolError,
		setSku,
		setModalSku
	})
}
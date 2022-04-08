import { RequestUpload } from "servises/repository/Axios/Request"
import { useState } from 'react';

export function useCasePooling(this: any) {
  const [statupool, setStatuspool] = useState(false)
  const [poolError,setPoolError] = useState<null | boolean>(null)

  const startPolling = async () => {
    try {
      setStatuspool(true)
      const result = await RequestUpload.Pooling()
      console.log(result)
      if (result.status === 200 && result.data.result === 'ok') {
        setPoolError(false)
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
    startPolling
  })
  this.status({
    statupool,
    poolError
  })
}
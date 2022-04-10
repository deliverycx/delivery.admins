import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCasePooling } from "domains/useCase/upload/useCase.Pooling"

const Pooling = () => {
  const useCasePoints = adapterComponentUseCase(useCasePooling)
  const { startPolling } = useCasePoints.handlers
  const { statupool, poolError } = useCasePoints.status

  

  return (
    <div className="card">
          <div className="card-header">
            <h1 className="m-0">Обновление Айко</h1>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-block btn-dark btn-lg col-md-3"
              onClick={() => startPolling()}
            >
              Обновить
            </button>
          </div>

          <div className="card-body">
            {
              poolError === true &&
              <div className="alert alert-danger alert-dismissible">
                <h5>
                  <i className="icon fas fa-ban"></i> Ошибка при обновлении
                </h5>
              </div>
            }
            {
              poolError === false && 
              <div className="alert alert-success alert-dismissible">
                <h5>
                  <i className="icon fas fa-check"></i> Обновление прошло успешно
                </h5>
              </div>
            }
            
            {
              statupool &&
              <div className="alert alert-info alert-dismissible">
                  <h5><i className="icon fas fa-info"></i>Идет Обновление</h5>
              </div>
            }
            
          </div>
        </div>
  )
}
export default Pooling
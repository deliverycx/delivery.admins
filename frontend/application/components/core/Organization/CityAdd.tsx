import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCityAdd } from "domains/useCase/organization/useCase.Organization"

const CityAdd = () =>{

	const usecase = adapterComponentUseCase(useCityAdd)
	const {router} = usecase.data
	const {handleSubmit,onSubmit,register} = usecase.handlers

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
      <section className='content'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-primary'>
                <h3 className='mainbanner__title'>Основной баннер</h3>
              <div className='card-body'>
                <div className='popBox_item'>
                  <label className='form-label'>Ссылка</label>
                  <input type='text' {...register('name')} name='name' className='form-control' />
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <a onClick={router.back} className='btn btn-secondary'>Отменить добавление</a>
            <input type='submit' value='Добавить баннер' className='btn btn-success float-right' />
          </div>
        </div>
      </section>
    </form>
	)
}
export default CityAdd
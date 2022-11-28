import { useOrganizationAdd } from "domains/useCase/organization/useCase.Organization";
import { adapterComponentUseCase } from 'adapters/adapterComponents';

const OrganizationAdd = () =>{

	const usecase = adapterComponentUseCase(useOrganizationAdd)
	const {router,organizations} = usecase.data
	const {handleSubmit,onSubmit,register,handlerSelectCity} = usecase.handlers

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
      <section className='content'>
				
        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-primary'>
                <h3 className='mainbanner__title'>Добавить точку</h3>
              <div className='card-body'>
							<div className='popBox_item'>
								<label className='form-label'>Город</label>
									{
										organizations &&
										<select onChange={handlerSelectCity}>
											{
												organizations.map((val:any)=>{
													return <option key={val._id} value={val._id}>{val.name}</option>
												})
											}
										</select>
									}
								</div>
                <div className='popBox_item'>
                  <label className='form-label'>Адресс</label>
                  <input type='text' {...register('street')} name='street' className='form-control' />
                </div>
								<div className="row">
									<div className='popBox_item col-3'>
	                  <label className='form-label'>longitude</label>
	                  <input type='text' {...register('longitude')} name='longitude' className='form-control' />
	                </div>
									<div className='popBox_item col-3'>
	                  <label className='form-label'>latitude</label>
	                  <input type='text' {...register('latitude')} name='latitude' className='form-control' />
	                </div>
								</div>
								
								<div className='popBox_item'>
                  <label className='form-label'>Телефон</label>
                  <input type='text' {...register('phone')} name='phone' className='form-control' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <a onClick={router.back} className='btn btn-secondary'>Отменить добавление</a>
            <input type='submit' value='Добавить' className='btn btn-success float-right' />
          </div>
        </div>
      </section>
    </form>
	)
}
export default OrganizationAdd
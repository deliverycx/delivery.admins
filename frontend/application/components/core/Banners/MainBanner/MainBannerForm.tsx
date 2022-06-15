import { Tfile } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import axios from 'axios';
import { useMainBanner, useMainBannerForm } from 'domains/useCase/banners/useCase.MainBanner';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm } from 'react-hook-form';
import { RequestBanners } from 'servises/repository/Axios/Request';

const MainBannerForm = () =>{
	const useCasePoints = adapterComponentUseCase(useMainBannerForm)
	const {stateBanners,slideId,imagesArr} = useCasePoints.data
	const {register,handleSubmit,onSubmit,handlerFile,handlSelectOrg,router,onDelet,handlerInput} = useCasePoints.handlers
	

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
		<section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">General</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
							<div className="form-group">
                  <label htmlFor="exampleSelectBorder">Выбор точки</label><br />
                  <select {...register("org")} name="org">
											<option value="all" selected={(stateBanners.banners && stateBanners.banners.organization === 'all')}>Все точки</option>
										{
											stateBanners.organizations &&
											stateBanners.organizations.map((val:any,index:number)=>{
												return (
													<>
						
														<option disabled>{val.name}</option>
														{
															val.organizations.map((org:any)=>{
																return <option 
																	key={org.id} 
																	onClick={()=> handlSelectOrg(org.id)} 
																	value={org.id}
																	selected={
																		(stateBanners.banners && stateBanners.banners.organization === org.id)
																		 
																	}
																	>- {org.address.street}</option>
															})
														}
														
													</>
												)
												
											})
										}
                    
                  </select>
									{
										typeof stateBanners.error === 'boolean' && 
										stateBanners.error && <span>выберите точку</span>
									}
               </div>
							 <div className="popBox_item"> 
			            <label className="form-label">Ссылка</label>
			            <input type="text" {...register('url')} name="url" onChange={e => handlerInput(e.target.value)} defaultValue={stateBanners.banners ? String(stateBanners.banners.url) : ''} className="form-control" />
			        </div>
							<div className="popBox_item"> 
			            <label className="form-label">Позиция в списке</label>
			            <input type="text" {...register('order')} name="order" defaultValue={stateBanners.banners ? String(stateBanners.banners.order) : ''} className="form-control" />
			        </div>
							<br />
							<div className="popBox_item"> 
									<label htmlFor="exampleSelectBorder">Изображения в топе</label>
		              <div className="form-group">
									{
										!slideId && <DropzoneArea onChange={e => handlerFile('file',e)} filesLimit={1} />
									}	
									
									{
					          slideId && stateBanners.banners && <DropzoneArea onChange={e => handlerFile('file',e)} filesLimit={20} initialFiles={imagesArr(stateBanners.banners.images)} />
					        }
		                
		              </div>
							</div>
							<br />
							<div className="popBox_item"> 
									<label htmlFor="exampleSelectBorder">Изображения новости</label>
									<div className="form-group">
									{
										!slideId && <DropzoneArea onChange={e => handlerFile('smallfile',e)} filesLimit={1} />
									}	
									
									{
					          slideId && stateBanners.banners && <DropzoneArea onChange={e => handlerFile('smallfile',e)} filesLimit={1} initialFiles={imagesArr(stateBanners.banners.smallimages)} />
					        }
		                
		              </div>
							</div>

							<br />
							<div className="popBox_item"> 
									<label htmlFor="exampleSelectBorder">Изображения мобильная</label>
									<div className="form-group">
									{
										!slideId && <DropzoneArea onChange={e => handlerFile('mobfile',e)} filesLimit={1} />
									}	
									
									{
					          slideId && stateBanners.banners && <DropzoneArea onChange={e => handlerFile('mobfile',e)} filesLimit={1} initialFiles={imagesArr(stateBanners.banners.mobimages)} />
					        }
		                
		              </div>
							</div>

              
            </div>

          </div>

        </div>
        
      </div>
      <div className="row">
        <div className="col-12">
          <a onClick={router.back} className="btn btn-secondary">Cancel</a>
					
					<input type="submit"  value="Сохранить" className="btn btn-success float-right"/>
					{
						slideId &&
						<a className="btn btn-secondary float-right" onClick={() => onDelet(slideId)}>Удалить</a>
					}
					
        </div>
				
      </div>
    </section>
		</form>
	)
}
export default MainBannerForm
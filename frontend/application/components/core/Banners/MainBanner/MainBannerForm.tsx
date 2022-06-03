import { Tfile } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import axios from 'axios';
import { useMainBanner, useMainBannerForm } from 'domains/useCase/banners/useCase.MainBanner';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm } from 'react-hook-form';
import { RequestBanners } from 'servises/repository/Axios/Request';

const MainBannerForm = () =>{
	const useCasePoints = adapterComponentUseCase(useMainBannerForm)
	const {register,banners,organizations,slideId,imagesArr} = useCasePoints.data
	const {handleSubmit,onSubmit,setfile,setSelectOrg,router,onDelet} = useCasePoints.handlers
	

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
                  <label htmlFor="exampleSelectBorder">Выбор точки</label>
                  <select className="custom-select form-control-border" name="org" id="exampleSelectBorder">
										{
											organizations &&
											organizations.map((val:any,index:number)=>{
												return (
													<>
														<option onClick={()=> setSelectOrg('all')}>Все</option>
														<option disabled>{val.name}</option>
														{
															val.organizations.map((org:any)=>{
																return <option 
																	key={org.id} 
																	onClick={()=> setSelectOrg(org.id)} 
																	value={org.id}
																	selected={banners && banners.organization === org.id}
																	>- {org.address.street}</option>
															})
														}
														
													</>
												)
												
											})
										}
                    
                  </select>
               </div>
              <div className="form-group">
							{
								!slideId && <DropzoneArea onChange={e => setfile(e)} filesLimit={20} />
							}	
							
							{
			          slideId && banners && <DropzoneArea onChange={e => setfile(e)} filesLimit={20} initialFiles={imagesArr(banners.images)} />
			        }
                
              </div>
              
            </div>

          </div>

        </div>
        
      </div>
      <div className="row">
        <div className="col-12">
          <a onClick={router.back} className="btn btn-secondary">Cancel</a>
					
          <input type="submit" value="Сохранить" className="btn btn-success float-right"/>
					<a className="btn btn-secondary float-right" onClick={() => onDelet(slideId)}>Удалить</a>
        </div>
      </div>
    </section>
		</form>
	)
}
export default MainBannerForm
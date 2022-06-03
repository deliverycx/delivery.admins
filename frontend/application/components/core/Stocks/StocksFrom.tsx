import { Tfile } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import axios from 'axios';
import { useMainBanner, useMainBannerForm } from 'domains/useCase/banners/useCase.MainBanner';
import { useNewsForm } from 'domains/useCase/news/useCase.News';
import { useStocksForm } from 'domains/useCase/stocks/useCase.Stocks';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm } from 'react-hook-form';
import { RequestBanners } from 'servises/repository/Axios/Request';

const NewsForm = () =>{
	const useCasePoints = adapterComponentUseCase(useStocksForm)
	const {register,newslist,slideId,imagesArr} = useCasePoints.data
	const {handleSubmit,onSubmit,setfile,router,onDelet,setInput} = useCasePoints.handlers
	

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
							<div className="popBox_item"> 
			            <label className="form-label">Заголовок</label>
			            <input type="text" name="link" onChange={e => setInput(e.target.value)} defaultValue={newslist ? String(newslist.link) : ''} className="form-control" />
			        </div>
						</div>
              <div className="form-group">
							{
								!slideId && <DropzoneArea onChange={e => setfile(e)} filesLimit={1} />
							}	
							
							{
			          slideId && newslist && <DropzoneArea onChange={e => setfile(e)} filesLimit={1} initialFiles={imagesArr(newslist.images)} />
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
export default NewsForm
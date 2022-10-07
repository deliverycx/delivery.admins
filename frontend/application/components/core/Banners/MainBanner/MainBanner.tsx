import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { imgRout } from 'application/helpers/imgInit';
import { useMainBanner } from 'domains/useCase/banners/useCase.MainBanner';


const MainBanner = () => {
  const useCasePoints = adapterComponentUseCase(useMainBanner);
  const { banners } = useCasePoints.data;

  const grid = 4;
  const getItemStyle = () => ({
    padding: grid * 2,
    background: '#f0f0f0',
  });

  return (
    <div className='col-12 ma0-l mainbanner'>
      <div className="mainbanner__btn-container">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href='/banners/mainbanner/add' className='add-banner-btn'>Добавить баннер</a>
      </div>
      <div className='card card-primary'>
        <div className='mainbanner__title'>
          <h4>Баннеры в топе</h4>
        </div>
        <div className='card-body'>
          <div className='row'>
            {
              banners &&
              banners.sort((a: any, b: any) => (a.order - b.order)).map((val: any) => {
                return (
                  <div
                    key={val._id}
                    style={getItemStyle()}
                    className='main-banner-small'
                  >
                    <a href={`/banners/mainbanner/${val._id}`} data-toggle='lightbox' data-title='sample 1 - white'
                       data-gallery='gallery'>
                      <img src={imgRout(val.images[0])} className='img-fluid mb-2' alt='white sample' />
                    </a>
                  </div>
                );
              })
            }
            {
              /*

              <DragDropHorizontal list={banners.images} render={(val:any) =>(
                <a href={`/banners/${banners._id}`} data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
                <img src={imgRout(val.content)} className="img-fluid mb-2" alt="white sample"/>
              </a>
              )}
              handle={(items:any)=>{
                setBuImages(banners._id,items)
              }}

              />
              */
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainBanner;

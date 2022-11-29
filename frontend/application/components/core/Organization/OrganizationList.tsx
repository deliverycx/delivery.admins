import { IPoint, ListOrganization } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganization } from 'domains/useCase/organization/useCase.Organization';
import cn from 'classnames';
import { CART_CHOICE } from 'application/contstans/cart.const';
import OrganizationContlols from './OrganizationSetting/OrganizationContlols';


type IProps = {
  orgs: ListOrganization[]
}

const OrganizationList = () => {
  const useCasePoints = adapterComponentUseCase(useOrganization);
  const { organizations } = useCasePoints.data;
  const { handlePuckUp, handleHiddenOrg, handleHiddenCity } = useCasePoints.handlers;

	let sortedCities;
	if (organizations) sortedCities = organizations.slice().sort((a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1);

  return (
    <>
			<div className='row'>
					<a href="/organization/cityadd" className="col-2 btn btn-block btn-outline-primary">Добавить город</a>
					<a href="/organization/add" className="col-2 btn btn-block btn-outline-primary">Добавить точку</a>
			</div>
			
      {
        sortedCities &&
        sortedCities.map((org: ListOrganization, index: number) => {
          if (org) {
            const CNCity = cn('col-2 btn btn-block', { 'btn-success': org.isHidden });
            return (
              <div key={index} className='card'>
                <div className='card-header'>
                  <div className='row'>
                    <h3 className='card-title title_org'>{org.name}</h3><br />
                    <div className={CNCity}
                         onClick={() => handleHiddenCity(
                           org._id,
                           !org.isHidden)}
                    >Скрыть город
                    </div>
                  </div>
                </div>
                {
                  org.organizations.map((point: IPoint, i: number) => {
                    return <OrganizationContlols key={point.id} point={point} handels={useCasePoints.handlers} />
                  })
                }
								
              </div>
            );
          }
        })
      }
    </>
  );
};
export default OrganizationList;

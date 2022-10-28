import { IPoint, ListOrganization } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganization } from 'domains/useCase/organization/useCase.Organization';
import cn from 'classnames';
import { CART_CHOICE } from 'application/contstans/cart.const';
import OrganizationContlols from './viewSetting/OrganizationContlols';

type IProps = {
  orgs: ListOrganization[]
}

const OrganizationList = () => {
  const useCasePoints = adapterComponentUseCase(useOrganization);
  const { organizations } = useCasePoints.data;
  const { handlePuckUp, handleHiddenOrg, handleHiddenCity } = useCasePoints.handlers;

  return (
    <>
      {
        organizations &&
        organizations.map((org: ListOrganization, index: number) => {
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

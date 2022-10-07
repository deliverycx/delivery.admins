import { IPoint, ListOrganization } from '@type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganization } from 'domains/useCase/organization/useCase.Organization';
import cn from 'classnames';
import { CART_CHOICE } from 'application/contstans/cart.const';

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
            const CNCity = cn('col btn btn-block', { 'btn-success': org.isHidden });
            return (
              <div key={index} className='card'>
                <div className='card-header'>
                  <div className='row'>
                    <h3 className='card-title'>{org.name}</h3><br />
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
                    const CNdelivMetod = cn('col btn btn-block', {
                      'btn-success':
                        (point.delivMetod === CART_CHOICE.PICKUP),
                    });
                    const CNdelivMetodNODELIV = cn('col btn btn-block', {
                      'btn-success':
                        (point.delivMetod === CART_CHOICE.NODELIVERY),
                    });
                    const CNhiddenMetod = cn('hide-point-btn', { 'btn-success': point.isHidden });
                    return (
                      <div key={point.id} className='card-body'>
                        <div className='card-footer'>
                          <a className='card-title' href={`/organization/${point.id}`}>{point.address.street}</a>
                          {!point.isHidden &&
                            <div className='css-button'>
                              <p className='css-button-text'
                                 onClick={() => handleHiddenOrg(point.id, !point.isHidden)}>Скрыть точку</p>
                              <div className='css-button-inner'>
                                <div className='reset-skew'>
                                  <p className='css-button-inner-text'
                                     onClick={() => handleHiddenOrg(point.id, !point.isHidden)}>Скрыть точку</p>
                                </div>
                              </div>
                            </div>
                          }
                          {point.isHidden &&
                            <div className='css-button'>
                              <div className='point-hidden'>
                                  <p className='css-button-inner-text'
                                     onClick={() => handleHiddenOrg(point.id, !point.isHidden)}>Точка скрыта</p>
                              </div>
                            </div>
                          }
                          <hr />
                                <div className={CNdelivMetod}
                                     onClick={() => handlePuckUp(
                                       point.id,
                                       point.delivMetod === CART_CHOICE.PICKUP ? null : CART_CHOICE.PICKUP)}
                                >Только Самовывоз
                                </div>
                                <div className={CNdelivMetodNODELIV}
                                     onClick={() => handlePuckUp(
                                       point.id,
                                       point.delivMetod === CART_CHOICE.NODELIVERY ? null : CART_CHOICE.NODELIVERY)}
                                >Отключить доставку
                                </div>
                        </div>
                      </div>
                    );
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

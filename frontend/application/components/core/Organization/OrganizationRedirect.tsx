import { FC, useState } from 'react';
import { RequestOrganization } from 'servises/repository/Axios/Request';
import cn from 'classnames';

const OrganizationRedirect:FC<{organization:any,refresh:any}> = ({organization,refresh}) =>{

	const [onRedirect,setOnredirect] = useState<any>()

	const handleOn = async () =>{
		await RequestOrganization.redirectOn({
			idorganization:organization.id,
			redirecton:!organization.redirectON
		})
		refresh(organization.id)
	}

	const onSubmit = async () =>{
		await RequestOrganization.redirect({
			idorganization:organization.id,
			redirect:onRedirect
		})
		refresh(organization.id)
	}

	console.log(organization);

	const CN = cn('col-2 btn btn-block', {
		'btn-success':organization.redirectON,
	});

	return(
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Редирект</h3>
            </div>
            <div className="card-body">
						<div className="form-group">
							<button className={CN} onClick={()=>handleOn()}>{organization.isHidden ? 'Редирект включен' : 'Редирект выключен'}</button>

								<br />
								<div className="popBox_item col-3"> 
				            <label className="form-label">Ид точки с доставки</label>
				            <input type="text" name="link" onChange={e => setOnredirect(e.target.value)} defaultValue={organization.redirect ? organization.redirect : ''} className="form-control" />
				        </div>


						</div>
						<input type="submit" value="Сохранить" onClick={onSubmit} className="btn btn-success"/>

            </div>

          </div>
	)
}
export default OrganizationRedirect
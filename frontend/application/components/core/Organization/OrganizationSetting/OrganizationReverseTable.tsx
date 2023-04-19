import { FC } from "react"
import { RequestOrganization } from "servises/repository/Axios/Request"

const OrganizationReverseTable:FC<{organization:any,refresh:any}> = ({organization,refresh}) =>{

	const handleReserveTable = async (event:any) =>{
		const value = event.target.value
		const tobol = value === 'true' ? true : false
		await RequestOrganization.reserveTable({
			idorganization: organization.id,
			reservetable:tobol
		})
		refresh(organization.id)
	}

	return (
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Заказать столик</h3>
            </div>
            <div className="card-body">
							
							
							<input
								id="tablefalse"
	              type="radio"
	              value="false"
	              checked={organization && organization.reservetable == false}
	              onChange={handleReserveTable}
	            />
							<label htmlFor="tablefalse">Скрыть</label>
							<br />
							
							<input
								id="tabletrue"
	              type="radio"
	              value="true"
	              checked={organization && organization.reservetable == true}
	              onChange={handleReserveTable}
	            />
              <label htmlFor="tabletrue">Показать</label>

            </div>

          </div>
	)
}
export default OrganizationReverseTable
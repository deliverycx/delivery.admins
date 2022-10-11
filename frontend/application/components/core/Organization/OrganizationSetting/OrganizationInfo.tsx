import { IOrganization } from "@type";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useOrganizationSettingFrom } from "domains/useCase/organization/useCase.OrganizationSetting";
import { useFormik, FormikProvider } from "formik";
import { FC } from "react";

type IProps = {
	organization:IOrganization
}

const OrganizationInfo:FC<IProps> = ({organization}) =>{
	const useSettingForm = adapterComponentUseCase(useOrganizationSettingFrom,organization)
	const {formik} = useSettingForm.data
	const {} = useSettingForm.handlers

	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
		<div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Настройки</h3>
            </div>
            <div className="card-body">
						
						<div className="form-group">
							<div className="popBox_item col-3"> 
			            <label className="form-label">Телефон</label>
			            <input type="text"className="form-control"
									name="phone"
									placeholder="Телефон"
									value={formik.values.phone}
									onChange={formik.handleChange}
									/>
			        </div>
						</div>
						<input type="submit" value="Сохранить" className="btn btn-success"/>
            
            </div>
						

          </div>
					</form>		
		</FormikProvider>			
	)
}
export default OrganizationInfo
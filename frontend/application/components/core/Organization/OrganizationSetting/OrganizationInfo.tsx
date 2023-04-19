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
			            <label className="form-label">Адресс</label>
			            <input type="text"className="form-control"
									name="adress"
									placeholder="Адрес"
									value={formik.values.adress}
									onChange={formik.handleChange}
									/>
			        </div>
						</div>
						<div className="form-group">
							<div className="popBox_item col-6"> 
			            <label className="form-label">Координаты</label>
									<div className="row">
										<div className="col-3">
										<input type="text"className="form-control"
											name="longitude"
											placeholder="longitude"
											value={formik.values.longitude}
											onChange={formik.handleChange}
											/>
										</div>
										<div className="col-3">
											<input type="text"className="form-control"
												name="latitude"
												placeholder="latitude"
												value={formik.values.latitude}
												onChange={formik.handleChange}
											/>
										
										</div>
									
									</div>
			            
			        </div>
						</div>
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
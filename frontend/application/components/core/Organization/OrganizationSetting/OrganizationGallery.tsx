import { imgRout } from 'application/helpers/imgInit';
import { DropzoneArea } from 'material-ui-dropzone';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestOrganization } from 'servises/repository/Axios/Request';

const OrganizationGallery:FC<{organization:any}> = ({organization}) => {
	const { register, handleSubmit } = useForm<{ img: any }>();

	const [file, setFile] = useState<any>()

	const onSubmit = async (data: any) => {
		try {
			const formData = new FormData()
			for (let i = 0; i < file.length; i++) {
				formData.append('files', file[i])
			}
			formData.append('idorganization',organization.id)
			await RequestOrganization.addCalleryOrg(formData)

		} catch (error) {
			console.log(error);
		}
	}

	const imagesArr = useCallback((mass:string[]) => {
		return mass.map((val:string) => {
			return imgRout(val)
		})
  },[])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<section className='content'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='card card-primary'>
								<h3 className='mainbanner__title'>Галерея</h3>
								<div className='card-body'>
									<div className='popBox_item'>
										<label className='form-label'>фото в организации</label>
										<DropzoneArea onChange={e => setFile(e)} filesLimit={10} 
											initialFiles={organization.gallery && imagesArr(organization.gallery)}
										/>
									</div>
									
								</div>
								<input type='submit' value='Добавить фото' className='btn btn-success float-right' />
							</div>
							
						</div>
					</div>
				</section>
			</form>
		</>
	)
}
export default OrganizationGallery
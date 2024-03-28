import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RequestUsers } from "servises/repository/Axios/Request";
import { requestUserRegister } from "servises/repository/Axios/Request/Request.User";
import UserPages from "./UserPages";



const UserForm: FC<{ user: any }> = ({ user }) => {

	const { register, handleSubmit, watch, setValue } = useForm<typeof initState>();


	const initState = {
		name: '',
		password: '',
		token: '',
		merchantId: '',
		role: "superadmin"
	}
	const onSubmit = async (data: any) => {

		try {
			console.log({ ...user, ...data });
			await requestUserRegister.updateSuperUsers({ ...user, ...data, })

		} catch (error) {
			console.log(error);
		}
	}



	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<section className="content">
					<div className="row">
						<div className="col-md-12">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Редактировать профиль {user.name}</h3>

									<div className="card-tools">
										<button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
											<i className="fas fa-minus"></i>
										</button>
									</div>
								</div>
								<div className="card-body">
									<div className="popBox_item form-group">
										<label className="form-label">Логин</label>
										<input type="text" {...register('name')} defaultValue={user ? user.name : ''} name="name" className="form-control" />
									</div>
									<div className="popBox_item form-group">
										<label className="form-label">Пароль</label>
										<input type="password" {...register('password')} defaultValue={user ? user.password : ''} name="password" className="form-control" />
									</div>




									<div className="popBox_item form-group">


									</div>
									<div className="row">
										<div className="col-12">


											<input type="submit" value="Сохранить" className="btn btn-success float-right" />


										</div>

									</div>
								</div>

							</div>

						</div>

					</div>

				</section>
			</form>
			<UserPages user={user} />
		</>
	)
}
export default UserForm
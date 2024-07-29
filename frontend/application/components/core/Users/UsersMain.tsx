import { IAdminUser, ISuperAdminUser } from "@type";
import Modal from "application/components/common/Modal/Modal"
import { useRole } from "application/contstans/user.const";
import { id } from 'date-fns/locale';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequestUsers } from "servises/repository/Axios/Request";
import { requestUserRegister } from 'servises/repository/Axios/Request/Request.User';

const initState = {
	name: '',
	password: '',
	token: '',
	merchantId: '',
	role: ""
}
const UsersMain = () => {
	const [modal, setModal] = useState<boolean>()
	const [users, setUsers] = useState<any>(null)
	const [roles, setRoles] = useState<string>(useRole.superadmin.role)
	const { register, handleSubmit, watch, setValue } = useForm<typeof initState>();


	const onSubmit = async (data: any) => {
		try {
			await requestUserRegister.regSuperUsers({ ...data, role: roles })
			setModal(false)
			getUsers()
		} catch (error) {
			console.log(error);
		}
	}

	const getUsers = async () => {
		try {
			const { data } = await RequestUsers.CRUDFabric.getAll()

			if (data && Array.isArray(data)) {
				const res = data.filter((value) => {
					return value.role !== useRole.admin.role
				})
				//console.log(res)
				setUsers(res)
			}

		} catch (error) {

		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<>
			<div className="organization_control">
				<div className="col-2 btn btn-primary" onClick={() => setModal(true)}>Добавить пользователя</div>

			</div>
			{
				modal &&
				<Modal setter={setModal} >
					<form onSubmit={handleSubmit(onSubmit)}>
						<section className="content">
							<div className="row">
								<div className="col-md-12">
									<div className="card card-primary">
										<div className="card-header">
											<h3 className="card-title">Добавить пользователя</h3>

											<div className="card-tools">
												<button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
													<i className="fas fa-minus"></i>
												</button>
											</div>
										</div>
										<div className="card-body">
											<div className="popBox_item form-group">
												<label className="form-label">Логин</label>
												<input type="text" {...register('name')} defaultValue={users ? users.name : ''} name="name" className="form-control" />
											</div>
											<div className="popBox_item form-group">
												<label className="form-label">Пароль</label>
												<input type="text" {...register('password')} defaultValue={users ? users.password : ''} name="password" className="form-control" />
											</div>




											<div className="popBox_item form-group">
												<select onChange={e => setRoles(e.target.value)}>
													<option value={useRole.superadmin.role}>{useRole.superadmin.name}</option>
													<option value={useRole.guestadmin.role}>{useRole.guestadmin.name}</option>
													<option value={useRole.franchazi.role}>{useRole.franchazi.name}</option>

												</select>

											</div>
										</div>

									</div>

								</div>

							</div>
							<div className="row">
								<div className="col-12">


									<input type="submit" value="Сохранить" className="btn btn-success float-right" />


								</div>

							</div>
						</section>
					</form>
				</Modal>
			}

			<div className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Пользователи</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="content">
				<div className="card">
					<div className="card-body p-0">
						<table className="table table-striped projects">
							<thead>
								<tr>

									<th >
										Имя
									</th>
									<th>
										Роль
									</th>

								</tr>
							</thead>
							<tbody>
								{
									users && users.map((val: { name: string, role: keyof typeof useRole }) => (
										<tr>
											<td>
												<a href={`/users/${val.name}`}>
													{val.name}
												</a>

											</td>
											<td>
												{useRole.hasOwnProperty(val.role) && useRole[val.role].name}
											</td>
										</tr>
									))

								}

							</tbody>
						</table>
					</div>
				</div>
			</div>

		</>
	)
}
export default UsersMain
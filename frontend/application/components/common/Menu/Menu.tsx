import { ROUTE_PAGE } from "application/contstans/routs";
import axios from "axios"
import { userModel } from "domains/models/Users.model";
import { observer } from "mobx-react-lite";
import { useRouter } from 'next/router';


const Menu = () => {
	const router = useRouter()

	const user = userModel.user


	const deliteCookies = async () => {
		try {
			const { data } = await axios.get('/api/auth/logout')
			if (data && data.ok) {
				router.push('/auth')
			}
		} catch (error) {
			console.log(error);
		}

	}

	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">


			{
				user &&


				<div className="sidebar">

					<div className="user-panel mt-3 pb-3 mb-3 d-flex">
						<div className="image">
							<img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
						</div>
						<div className="info">
							<a href="#" className="d-block">{user.name}</a>
							<a onClick={deliteCookies}>выйти</a>
						</div>
					</div>


					<div className="form-inline">
						<div className="input-group" data-widget="sidebar-search">

							<div className="input-group-append">
								<button className="btn btn-sidebar">
									<i className="fas fa-search fa-fw"></i>
								</button>
							</div>
						</div>
					</div>


					<nav className="mt-2">
						<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

							{
								user.pagesUser.length !== 0 &&
								user.pagesUser.map((page: any) => {
									return (
										<li className="nav-item">
											<a href={`/${page.path}/`} className="nav-link">
												<i className="nav-icon fas fa-tachometer-alt"></i>
												<p>
													{page.name}
													<i className="right fas fa-angle-left"></i>
												</p>
												{
													page.child &&
													<ul className="nav nav-treeview">
														{
															page.child.map((childpage: any) => {
																return (
																	<li className="nav-item">
																		<a href={`/${childpage.path}/`} className="nav-link">
																			<i className="far fa-circle nav-icon"></i>
																			<p>{childpage.name}</p>
																		</a>
																	</li>
																)
															})
														}

													</ul>
												}
											</a>
										</li>
									)
								})
							}
							
							{
								!user.role &&
								ROUTE_PAGE.map((page: any) => {
									return (
										<li className="nav-item">
											<a href={`/${page.path}/`} className="nav-link">
												<i className="nav-icon fas fa-tachometer-alt"></i>
												<p>
													{page.name}
													<i className="right fas fa-angle-left"></i>
												</p>
												{
													page.child &&
													<ul className="nav nav-treeview">
														{
															page.child.map((childpage: any) => {
																return (
																	<li className="nav-item">
																		<a href={`/${childpage.path}/`} className="nav-link">
																			<i className="far fa-circle nav-icon"></i>
																			<p>{childpage.name}</p>
																		</a>
																	</li>
																)
															})
														}

													</ul>
												}
											</a>
										</li>
									)
								})
							}

						</ul>
					</nav>

				</div>
			}
		</aside>
	)
}
export default observer(Menu) 
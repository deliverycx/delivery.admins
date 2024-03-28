import { ROUTE_PAGE } from "application/contstans/routs";
import cn from "classnames";
import { useRouter } from "next/router";
import { FC } from "react";
import { requestUserRegister } from "servises/repository/Axios/Request/Request.User";

const UserPages:FC<{user:any}> = ({user}) => {
	const router = useRouter();
	const handlerAddPage = async (page:any) =>{
		try {

			let mass = Array.isArray(user.pagesUser) ? [...user.pagesUser] : []
			const index = mass.map((e:any) => e.path).indexOf(page.path)
				if(index !== -1){
					mass.splice(index, 1)
				}else{
					mass.push(page)
				}
			await requestUserRegister.addPagesUser({
				id:user._id,
				pages:mass
			})
			router.reload()
		} catch (error) {
			
		}
	}

	return (
		<div className="card card-primary">
			<div className="card-body">

				<h4>Список активныйх страниц</h4>
				<div className='col-md-12'>
					<div className='card card-primary'>
						<div className='card-body'>

							<div className="row">
								{
									ROUTE_PAGE.map((value) =>{
										const inc = user.pagesUser &&  user.pagesUser.map((e:any) => e.path).includes(value.path)
										
										const CN = cn("btn btn-app btn-sm col-2", { "bg-success": inc });
										return <button className={CN}
											onClick={()=> handlerAddPage(value)}
										>{
											value.name
										}</button>
									})
								}


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}
export default UserPages
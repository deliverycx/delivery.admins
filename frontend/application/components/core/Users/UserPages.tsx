import FormSelectOrganization from "application/components/common/Form/FormSelectOrganization";
import { ROUTE_PAGE } from "application/contstans/routs";
import cn from "classnames";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { RequestOrganization } from "servises/repository/Axios/Request";
import { requestUserRegister } from "servises/repository/Axios/Request/Request.User";

const UserPages: FC<{ user: any }> = ({ user }) => {
	const router = useRouter();
	const [orgid, setOrgid] = useState("");
	const [points, setPoints] = useState<any>(null);

	const getPoints = async () => {
		try {
			const { data } = await RequestOrganization.getPoints();
			setPoints(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPoints();
	}, [user]);

	const handlerAddPage = async (page: any) => {
		try {
			let mass = Array.isArray(user.pagesUser) ? [...user.pagesUser] : [];
			const index = mass.map((e: any) => e.path).indexOf(page.path);
			if (index !== -1) {
				mass.splice(index, 1);
			} else {
				mass.push(page);
			}
			await requestUserRegister.addPagesUser({
				id: user._id,
				pages: mass,
			});
			router.reload();
		} catch (error) { }
	};

	const handlerAddPoint = async (point: string) => {
		try {
			let mass = Array.isArray(user.organizationsUser)
				? [...user.organizationsUser, point]
				: [point];
			await requestUserRegister.addPointUser({
				id: user._id,
				points: mass,
			});
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const filtredPoints = useMemo(() => {
		return (
			points &&
			points.filter((item: any) => user.organizationsUser.includes(item.id))
		);
	}, [points]);

	return (
		<div className="card card-primary">
			<div className="card-body">
				<h4>Список активныйх страниц</h4>
				<div className="col-md-12">
					<div className="card card-primary">
						<div className="card-body">
							<div className="row">
								{ROUTE_PAGE.map((value) => {
									const inc =
										user.pagesUser &&
										user.pagesUser.map((e: any) => e.path).includes(value.path);

									const CN = cn("btn btn-app btn-sm col-2", {
										"bg-success": inc,
									});
									return (
										<button
											className={CN}
											onClick={() => handlerAddPage(value)}
										>
											{value.name}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="card-body">
				<h4>Список заведений франчайзи</h4>
				<div className="col-md-12">
					<div className="card card-primary">
						<div className="card-body">
							<div className="row ">
								<FormSelectOrganization selected="all" setter={setOrgid} />

								<div
									className="col-2 btn btn-primary"
									onClick={() => handlerAddPoint(orgid)}
								>
									Добавить точку
								</div>
							</div>

							<ul>
								{filtredPoints &&
									filtredPoints.map((value: any) => {
										return (
											<li>
												{value.city.name},{value.address.street}
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default UserPages;

import Header from "application/components/common/Header/Header";
import MenuAdmins from "application/components/common/Menu/MenuAdmins";
import { userRout } from "application/contstans/user.const";
import { withCheckSession } from "application/helpers/session";
import { format } from "date-fns";
import { NextPage } from "next";
import OrdersDelivery from "pages/order/ordersDelivery";
import { useState, useEffect } from "react";
import RequestOrganizationCount from "servises/repository/Axios/Request/Request.OrganizationCount";

const AdminPage: NextPage = ({ user }: any) => {
	const [counterHI, setCounterHi] = useState<any>(null)
	const [value, setValue] = useState<any>(0)

	const getCoutn = async () => {
		try {
			const { data } = await RequestOrganizationCount.CRUDFabric.getBuOrg(user.organization)
			if (data) {
				setCounterHi(data)
				//setValue(data.coutn)
			}
		} catch (error) {
			console.log(error);
		}
	}

	console.log(counterHI);

	useEffect(() => {
		user.organization && getCoutn()
	}, [user])

	const handlerCouter = async () => {
		try {
			const dates = format(new Date(), 'yyyy-MM-dd')

			const valueHi = (Number(counterHI.coutn) + Number(value))

			await RequestOrganizationCount.findBuOrg(
				{ ...counterHI, coutn: valueHi }
			)

			getCoutn()
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<div className="wrapper">
			<Header />
			<MenuAdmins />
			<div className="content-wrapper ordertable">
				<div className="card card-primary">
					<div className="card-header">
						<h3 className="card-title">Счечик хинкалий</h3>
					</div>
					<br />
					<h1>Текущий счетчик {counterHI && counterHI.coutn}</h1>
					<br />
					<div className="card-body">
						<div className="form-group">

							<label>Добавить количество к счечику</label> <br />
							<input type="number" value={value} onChange={e => setValue(e.target.value)} />

						</div>

						<button type="submit" className="btn btn-success" onClick={handlerCouter}>Сохранить</button>

					</div>

				</div>
			</div>

		</div>
	)
}
export default AdminPage
export const getServerSideProps = withCheckSession({ ...userRout.admins })
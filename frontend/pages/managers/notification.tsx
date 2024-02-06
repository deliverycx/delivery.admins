import Container from "application/components/common/Container/Container"
import Footer from "application/components/common/Footer/Footer"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MenuAdmins from "application/components/common/Menu/MenuAdmins"
import OrdersPayment from "application/components/core/Orders/OrdersPayment/OrdersPayment"
import { userRout } from "application/contstans/userRout.const"
import { withCheckSession } from "application/helpers/session"
import { NextPage } from "next"
import OrdersDelivery from "application/components/core/Orders/OrdersDelivery/OrdersDelivery"

const AdminPage: NextPage = ({ user }: any) => {
	console.log(user);
	return (
		<div className="wrapper">
			<Header />
			<MenuAdmins />
			<Container>
				<div className="col-12 ma0-l">
					<div className="col-2 card-header">
						<h1>Справочная</h1>
					</div>
					<div className="card card-primary">
						<div className="card-header">
							<h4 className="card-title">Инструкция: оплаченные картой заказы</h4>
						</div>
						<div className="card-body">
							<div className="notif_payment">

								<div>Прочитайте подробную инструкцию по алгоритмам действий, с оплаченными картой заказами
, <a href="../Инструкция_по_работе_с_заказами_с_онлайн_оплатой.pdf" target="_blank"><strong>здесь</strong></a></div>
								<h5>или просмотрите видео</h5>
								
								<div>
								<h4>Ожидание оплаты в айко</h4>
								<video width="520" height="340" controls preload="none">
						      <source src="../pay1.mp4" type="video/mp4" />
						  
						      Your browser does not support the video tag.
						    </video>
								<br />
								<h4>Подтверждение или отмена заказа, в администраторской панели</h4>
								<video width="520" height="340" controls preload="none">
						      <source src="../pay2.mp4" type="video/mp4" />
						  
						      Your browser does not support the video tag.
						    </video>

								</div>
							</div>
							
									
						</div>
					</div>
					
				</div>
			</Container>



		</div>
	)
}
export default AdminPage
export const getServerSideProps = withCheckSession({ ...userRout.admins })
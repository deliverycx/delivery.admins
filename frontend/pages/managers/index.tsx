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

const AdminPage: NextPage = ({user}:any) => {
	console.log(user);
  return (
		<div className="wrapper">
      <Header />
      <MenuAdmins />
			<div className="content-wrapper ordertable">
				<OrdersDelivery organization={user.organization} user={user}  />
			</div>
      
    </div>
  )
}
export default AdminPage
export const getServerSideProps = withCheckSession({...userRout.admins})
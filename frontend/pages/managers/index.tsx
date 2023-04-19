import Container from "application/components/common/Container/Container"
import Footer from "application/components/common/Footer/Footer"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MenuAdmins from "application/components/common/Menu/MenuAdmins"
import OrdersPayment from "application/components/core/Orders/OrdersPayment/OrdersPayment"
import { userRout } from "application/contstans/userRout.const"
import { withCheckSession } from "application/helpers/session"
import { NextPage } from "next"

const AdminPage: NextPage = ({user}:any) => {
  return (
		<div className="wrapper">
      <Header />
      <MenuAdmins />
			<div className="content-wrapper ordertable">
				<OrdersPayment organization={user.organization} />
			</div>
      
    </div>
  )
}
export default AdminPage
export const getServerSideProps = withCheckSession({...userRout.admins})
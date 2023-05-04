import Container from "application/components/common/Container/Container"
import FormSelectOrganization from "application/components/common/Form/FormSelectOrganization"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import NewsList from "application/components/core/News/NewsList"
import OrdersDelivery from "application/components/core/Orders/OrdersDelivery/OrdersDelivery"
import OrdersPayment from "application/components/core/Orders/OrdersPayment/OrdersPayment"
import { withCheckSession } from "application/helpers/session"
import { NextPage } from "next"
import { useState } from "react"



const News: NextPage = () => {
	const [orgid,setOrgid] = useState<string>()
	console.log(orgid);
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<div className="mainbanner__btn-container">
					<FormSelectOrganization selected="all"  setter={setOrgid} />
				</div>
				<OrdersDelivery organization={orgid} />
      </Container>
    </div>
	)
}
export default News
export const getServerSideProps = withCheckSession({roles:'admin',rout:'/'})
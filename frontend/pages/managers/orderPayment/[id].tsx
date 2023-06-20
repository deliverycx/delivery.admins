import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MenuAdmins from "application/components/common/Menu/MenuAdmins"
import OrderDeliveryCart from "application/components/core/Orders/OrdersDelivery/OrdersDeliveryCart"
import OrderPaymentCart from "application/components/core/Orders/OrdersPayment/OrderPaymentCart"
import { NextPage } from "next"

const News: NextPage = ({params}:any) => {
	return(
		<div className="wrapper">
      <Header />
      <MenuAdmins />
      <OrderDeliveryCart id={params.id} />
    </div>
	)
}
export default News

export async function getServerSideProps({params}:any) {
  // Fetch data from external API


  // Pass data to the page via props
  return { props: { params } }
}
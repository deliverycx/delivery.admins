import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import GuestVip from "application/components/core/DashBord/GuestVip"
import { NextPage } from "next"


const Banners: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<GuestVip />
      </Container>
    </div>
	)
}
export default Banners
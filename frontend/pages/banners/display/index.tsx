import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import DisplayBanner from "application/components/core/Banners/DisplayBanner/DisplayBanner"
import { NextPage } from "next"


const Banners: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<DisplayBanner />
      </Container>
    </div>
	)
}
export default Banners
import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MainBanner from "application/components/core/Banners/MainBanner/MainBanner"
import { NextPage } from "next"


const Banners: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<MainBanner />
      </Container>
    </div>
	)
}
export default Banners
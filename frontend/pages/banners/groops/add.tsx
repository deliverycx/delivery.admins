import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import GroopsBannerAdd from "application/components/core/Banners/GroopsBanner/GroopsBannerAdd"
import { NextPage } from "next"


const BannersAdd: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<GroopsBannerAdd />
      </Container>
    </div>
	)
}
export default BannersAdd
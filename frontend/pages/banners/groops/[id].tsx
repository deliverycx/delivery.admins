import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import GroopsBannerEdit from "application/components/core/Banners/GroopsBanner/GroopsBannerEdit"
import { NextPage } from "next"


const BannersAdd: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<GroopsBannerEdit />
      </Container>
    </div>
	)
}
export default BannersAdd
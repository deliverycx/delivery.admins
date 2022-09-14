import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import DisplayBannerEdit from "application/components/core/Banners/DisplayBanner/DisplayBannerEdit"
import { NextPage } from "next"


const BannersAdd: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<DisplayBannerEdit />
      </Container>
    </div>
	)
}
export default BannersAdd
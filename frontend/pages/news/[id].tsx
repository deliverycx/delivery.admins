import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MainBannerForm from "application/components/core/Banners/MainBanner/MainBannerForm"
import NewsForm from "application/components/core/News/NewsForm"
import { NextPage } from "next"


const BannersAdd: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<NewsForm />
      </Container>
    </div>
	)
}

export default BannersAdd
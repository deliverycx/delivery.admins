import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MainBannerForm from "application/components/core/Banners/MainBanner/MainBannerForm"
import NewsForm from "application/components/core/News/NewsForm"
import StocksForm from "application/components/core/Stocks/StocksFrom"
import { NextPage } from "next"


const StocksAdd: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<StocksForm />
      </Container>
    </div>
	)
}
export default StocksAdd
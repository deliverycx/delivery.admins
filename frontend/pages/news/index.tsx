import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import NewsList from "application/components/core/News/NewsList"
import { NextPage } from "next"



const News: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<NewsList />
      </Container>
    </div>
	)
}
export default News
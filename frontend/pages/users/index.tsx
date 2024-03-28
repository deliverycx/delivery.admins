import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import NewsList from "application/components/core/News/NewsList"
import { NextPage } from "next"
import Menu from "application/components/common/Menu/Menu"
import UsersMain from "application/components/core/Users/UsersMain"


const Users: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<UsersMain />
      </Container>
    </div>
	)
}
export default Users
import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import CityAdd from "application/components/core/Organization/CityAdd"
import OrganizationSetting from "application/components/core/Organization/OrganizationSetting"
import { NextPage } from "next"


const CityAddPage: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<CityAdd />
      </Container>
    </div>
	)
}
export default CityAddPage
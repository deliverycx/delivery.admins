import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import OrganizationAdd from "application/components/core/Organization/OrganizationAdd"
import OrganizationSetting from "application/components/core/Organization/OrganizationSetting"
import { NextPage } from "next"


const OrgSeting: NextPage = () => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<OrganizationAdd />
      </Container>
    </div>
	)
}
export default OrgSeting
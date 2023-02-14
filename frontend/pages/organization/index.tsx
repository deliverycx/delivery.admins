import { ListOrganization, User } from "@type";
import Container from "application/components/common/Container/Container";
import Header from "application/components/common/Header/Header";
import Menu from "application/components/common/Menu/Menu";
import OrganizationList from "application/components/core/Organization/OrganizationList";
import { userRout } from "application/contstans/userRout.const";
import { sessionOptions, withCheckSession } from "application/helpers/session";
import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import RequestOrganization from "servises/repository/Axios/Request/Request.Organization";



const Organization: NextPage = () => {
  


  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <Container>
        <OrganizationList />
      </Container>
    </div>
  );
};




export default Organization
export const getServerSideProps = withCheckSession({...userRout.superAdmin})

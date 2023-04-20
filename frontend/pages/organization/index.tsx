import { ListOrganization } from "@type";
import Container from "application/components/common/Container/Container";
import Header from "application/components/common/Header/Header";
import Menu from "application/components/common/Menu/Menu";
import OrganizationList from "application/components/core/Organization/OrganizationList";
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

/*
export async function getServerSideProps() {
  try {
    const {data} = await RequestOrganization.getAll()
    return { props: { data } }
  } catch (error) {
    console.log(error);
  }
  
}
*/


export default Organization
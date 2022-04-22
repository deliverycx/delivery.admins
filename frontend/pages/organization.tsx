import { ListOrganization } from "@type";
import Container from "application/components/common/Container/Container";
import Header from "application/components/common/Header/Header";
import Menu from "application/components/common/Menu/Menu";
import OrganizationList from "application/components/core/Organization/OrganizationList";
import { NextPage } from "next";
import RequestOrganization from "servises/repository/Axios/Request/Request.Organization";



const Organization: NextPage = ({data}:any) => {
  
  console.log(data);

  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <Container>
        <OrganizationList orgs={data} />
      </Container>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  
  const {data} = await RequestOrganization.getAll()
  // Pass data to the page via props
  return { props: { data } }
}


export default Organization
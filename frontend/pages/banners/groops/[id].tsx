import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import GroopsBannerEdit from "application/components/core/Banners/GroopsBanner/GroopsBannerEdit"
import { GetStaticPaths, NextPage } from "next"


const BannersAdd: NextPage = ({data,params}:any) => {
	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				<GroopsBannerEdit id={params.id} />
      </Container>
    </div>
	)
}
export default BannersAdd



export async function getServerSideProps({params}:any) {
  // Fetch data from external API


  // Pass data to the page via props
  return { props: { data:'www',params } }
}
import Container from "application/components/common/Container/Container"
import Header from "application/components/common/Header/Header"
import NewsList from "application/components/core/News/NewsList"
import { NextPage } from "next"
import Menu from "application/components/common/Menu/Menu"
import UsersMain from "application/components/core/Users/UsersMain"
import UserForm from "application/components/core/Users/UserForm"
import { useEffect, useState } from "react"
import { RequestUsers } from "servises/repository/Axios/Request"


const Users: NextPage = ({params}:any) => {
	const [user,setUser] = useState<any>(null)
	const getUserName = async (username:string) =>{
		try {
			const {data} = await RequestUsers.CRUDFabric.getBu(username)
			data && setUser(data)
			
		} catch (error) {
			
		}
		
	}

	console.log(user);

	
	useEffect(() =>{
		params.id && getUserName(params.id)
	},[params])

	return(
		<div className="wrapper">
      <Header />
      <Menu />
      <Container>
				{
					user &&
					<UserForm user={user} />
				}
				
      </Container>
    </div>
	)
}
export default Users


export async function getServerSideProps({params}:any) {
  // Fetch data from external API


  // Pass data to the page via props
  return { props: { params } }
}
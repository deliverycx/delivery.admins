import { userRout } from "application/contstans/userRout.const";
import { withCheckSession } from "application/helpers/session";

const org = () =>{
	return(
		<></>
	)
}
export default org
export const getServerSideProps = withCheckSession({...userRout.superAdmin})
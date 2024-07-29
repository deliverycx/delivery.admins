import { userRout } from "application/contstans/user.const";
import { withCheckSession } from "application/helpers/session";

const org = () => {
	return (
		<></>
	)
}
export default org
export const getServerSideProps = withCheckSession({ ...userRout.pointAdmin })
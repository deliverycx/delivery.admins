import { withCheckSession } from "application/helpers/session"

const Banner = () =>{

}
export default Banner
export const getServerSideProps = withCheckSession({roles:'admin',rout:'/'})
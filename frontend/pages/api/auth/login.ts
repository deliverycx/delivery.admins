import { NextApiRequest, NextApiResponse } from "next"
import { RequestUsers } from "servises/repository/Axios/Request"
import { withIronSessionApiRoute } from 'iron-session/next'
import { IAdminUser, User } from "@type"
import { sessionOptions } from "application/helpers/session"



async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const byuser:IAdminUser = await req.body

  try {
    
		
		if (!byuser) {
			res.status(500).end({isLoggedIn: false})
			return
		}

    const user = { 
			isLoggedIn: true,
			name:byuser.name,
			organization:byuser.organization,
			role:byuser?.role
		} as User
    req.session.user = user
    await req.session.save()
		console.log(user,byuser);
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
export default withIronSessionApiRoute(loginRoute, sessionOptions)
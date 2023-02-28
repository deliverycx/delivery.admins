import { User } from '@type'
import type { IronSessionOptions } from 'iron-session'
import { withIronSessionSsr } from 'iron-session/next'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session/examples/next.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure:process.env.NODE_ENV === 'production',
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}


export const withCheckSession = (witchUser:{roles:string,rout:string}) => withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user
	console.log('user',user);
	
  if (user === undefined) {
    res.setHeader('location', '/auth')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false} as User,
      },
    }
  }else{
		if(user.role === witchUser.roles){
			return {
				redirect: {
					permanent: true,
					destination: witchUser.rout,
				},
			};
		}
	}

  return {
    props: { user: req.session.user },
  }
},
sessionOptions)
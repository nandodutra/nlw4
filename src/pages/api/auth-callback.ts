import axios from 'axios'
import { NowRequest, NowResponse } from '@vercel/node'


export default async (req: NowRequest, res: NowResponse) => {
 
  const request = await axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: req.query.code,
    redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE
  }, {
    headers: {
      'Accept': 'application/json'
    }
  });

  return res.redirect(`/auth-callback/?access_token=${request.data.access_token}`)
}
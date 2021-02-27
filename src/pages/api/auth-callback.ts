import axios from 'axios'
import { NowRequest, NowResponse } from '@vercel/node'

export default async (req: NowRequest, res: NowResponse) => {
 
  const request = await axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: '47f0c12576a2ec0e6fc6',
    client_secret: '66974a3e0eddaef98f6195283994ad249282f71b',
    code: req.query.code,
    redirect_uri: 'http://localhost:3000/api/auth-callback',
    scope: 'user:email'
  }, {
    headers: {
      'Accept': 'application/json'
    }
  });

  return res.redirect(`/auth-callback/?access_token=${request.data.access_token}`)
}
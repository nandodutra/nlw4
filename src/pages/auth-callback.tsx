import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    

    router.events.on('routeChangeComplete', (evt) => {
      const token = evt.split('=')[1]

      if (token) {
        axios.get(`https://api.github.com/user`, {
          headers: {
            'Authorization': `token ${evt.split('=')[1]}`
          }
        }).then(resp => {
          const { avatar_url, name, login, url } = resp.data;
          Cookies.set('access_token', token);
          Cookies.set('avatar', avatar_url);
          Cookies.set('name', name);
          Cookies.set('login', login);
          Cookies.set('url', url);

          router.push('/');
        })
      }
    })
  }, [])

  return (
    <h1>Auth { router.query.access_token }</h1>
  )
}
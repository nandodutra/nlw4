import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import styles from '../styles/pages/AuthCallback.module.css'

export default function AuthCallback() {
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', (evt) => {
      const token = evt.split('=')[1]

      if (token) {
        setMessage('Validando sua conta github...')
        axios.get(`https://api.github.com/user`, {
          headers: {
            'Authorization': `token ${evt.split('=')[1]}`
          }
        }).then(resp => {
          setMessage('Carregando seus dados...')
          const { id, avatar_url, name, login, url } = resp.data;

          if (id) {

            axios.get(`/api/challenge-get-data?user_id=${id}`).then(resp => {
              Cookies.set('user_id', id)
              Cookies.set('user_access_token', token);
              Cookies.set('user_avatar', avatar_url);
              Cookies.set('user_name', name);
              Cookies.set('user_login', login);
              Cookies.set('user_url', url);

              if (resp.data) {
                const { level, challengesCompleted, currentExperience } = resp.data
                Cookies.set('level', String(level));
                Cookies.set('challengesCompleted', String(challengesCompleted));
                Cookies.set('currentExperience', String(currentExperience));
              } else {
                Cookies.set('level', String(1));
                Cookies.set('challengesCompleted', String(0));
                Cookies.set('currentExperience', String(0));
              }

              router.push('/');
            })

          }
        }, (err) => {
          setMessage(null)
          setError(true)
        })
      }
    })
  }, [])

  return (
    <div className={styles.container}>
      { message && <p>{message}</p> }
      { error && <p className={styles.error}>Erro ao validar seus usuário,  <a href="/auth">clique aqui</a> para voltar</p> }
    </div>
  )
}
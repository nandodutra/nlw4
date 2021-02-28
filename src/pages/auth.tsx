import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Auth.module.css'

const OAUTH_REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI

export default function Auth() {
  const [login, setLogin] = useState('');
  const [oauth, setOauth] = useState({
    client_id: process.env.OAUTH_CLIENT_ID,
  })
  
  function toParams(query) {
    const q = query.replace(/^\??\//, '');
  
    return q.split('&').reduce((values, param) => {
      const [key, value] = param.split('=');
  
      values[key] = value;
  
      return values;
    }, {});
  }

  function toQuery(params, delimiter = '&') {
    const keys = Object.keys(params);
  
    return keys.reduce((str, key, index) => {
      let query = `${str}${key}=${params[key]}`;
  
      if (index < (keys.length - 1)) {
        query += delimiter;
      }
  
      return query;
    }, '');
  }

  function signin() {
    const search = toQuery({
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE,
      login: login,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    });

    const url = `https://github.com/login/oauth/authorize?${search}`
    window.location.href = url
  }

  function inputKeyUpHandle(evt) {
    if (evt.code === 'Enter') signin()
  }

  return (
    <>
      <Head>
        <title>Move.it - Faça login</title>
      </Head>
      <div className={styles.container}>
        <img src="./logo-translucide.svg"/>

        <div className={styles.loginBox}>
          <img src="./logo-full.svg" alt="Move.it"/>
          <strong>Bem vindo</strong>

          <div>
            <img src="./github.svg" alt="github"/>
            <p>Faça login com seu Github<br/>para começar</p>
          </div>

          <div>
            <input 
              type="text" 
              placeholder="Digite seu username"
              value={login}
              onChange={(evt) => setLogin(evt.target.value) } 
              onKeyUp={ inputKeyUpHandle }
              />
            <button onClick={signin}>
              Logar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
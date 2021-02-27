import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/pages/Auth.module.css'

export default function Auth() {
  const [email, setEmail] = useState('');
  
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

  function login() {
    const id = 'github-oauth-authorize'

    const search = toQuery({
      client_id: '47f0c12576a2ec0e6fc6',
      scope: 'user:email',
      redirect_uri: 'http://localhost:3000/api/auth-callback',
    });

    const url = `https://github.com/login/oauth/authorize?${search}`
    window.location.href = url
    //window.open(url, id, toQuery({ width: 600, heigth: 1000 }, ','));
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
              value={email}
              onChange={(evt) => setEmail(evt.target.value) } 
              />
            <button onClick={login}>
              Logar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
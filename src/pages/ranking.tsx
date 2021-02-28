import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import RankingContext from '../Contexts/RankingContext'
import styles from '../styles/pages/Ranking.module.css'

export default function Ranking() {
  const { list } = useContext(RankingContext)

  return (
    <div className={styles.main}>
      <Head>
        <title>Move.it - Ranking</title>
      </Head>

      <Sidebar active="ranking" />

      <div className={styles.container}>
        <h3>Ranking <small>Top 10</small></h3>

        <table>
          <thead>
            <tr>
              <td>Posição</td>
              <td>Usuário</td>

              <td>Desafios</td>
            </tr>
          </thead>
          <tbody>
            { list.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>
                  <div className={styles.profileContainer}>
                    <img src={row.user_avatar} alt="Profile"/>
                    <div>
                      <strong>{row.user_name}</strong>
                      <p>
                        <img src="icons/level.svg" alt="Level" />
                        Level { row.level }</p>
                    </div>
                  </div>
                </td>
                <td><span>{row.challengesCompleted}</span> completados</td>
              </tr>
            )) }

            { !list.length && (
              <tr>
                <td className={styles.loading} colSpan={3}>
                  <p>carregando ranking...</p>
                </td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    </div>
 )
}
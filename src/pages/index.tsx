import Head from 'next/head'
import { useContext } from 'react'
import ChallengeBox from '../components/ChallengeBox'
import CompleteChallenges from '../components/CompleteChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import ChallengesContext, { ChallengesProvider } from '../Contexts/ChallengesContext'
import { CountdownProvider } from '../Contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home({ level, currentExperience, challengesCompleted }: HomeProps) {
  return (
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Move it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = ctx.req.cookies
  const { level, currentExperience, challengesCompleted } = cookies
  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
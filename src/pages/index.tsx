import Head from 'next/head'
import Cookies from 'js-cookie'
import ChallengeBox from '../components/ChallengeBox'
import CompleteChallenges from '../components/CompleteChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import { ChallengesProvider } from '../Contexts/ChallengesContext'
import { CountdownProvider } from '../Contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'
import Sidebar from '../components/Sidebar'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home({ level, currentExperience, challengesCompleted }: HomeProps) {
  const user_id = Cookies.get('user_id')
  const user_access_token = Cookies.get('user_access_token')

  return (
    <>
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}>
      
        <Head>
          <title>Move it</title>
        </Head>

        { (user_id && user_access_token) ? (
          <div className={styles.main}>
            <Sidebar active="home" />
          
            <div className={styles.container}>
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
          </div>
          ) : (<p>Carregando...</p>)
        }

    </ChallengesProvider>
    </>
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
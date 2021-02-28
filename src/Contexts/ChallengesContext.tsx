import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'

interface ChallengesProvideProps { 
  children: ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number 
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengeContextData {
  level: number, 
  experienceNextleval: number
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  closeLevelUpModal: () => void,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  setInitialData: (data) => void
}
const ChallengesContext = createContext({} as ChallengeContextData)


export function ChallengesProvider({ 
  children, 
  ...rest 
} : ChallengesProvideProps) {
  const Router = useRouter()
  const [level, setLevel] = useState(rest.level || 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceNextleval = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()

    const user_id = Cookies.get('user_id')
    const user_access_token = Cookies.get('user_access_token')
    
    if (!user_id || !user_access_token) {
      Router.push('/auth')
    }    
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

    const user_id = Cookies.get('user_id')
    const user_avatar = Cookies.get('user_avatar')
    const user_name = Cookies.get('user_name')
    const user_login = Cookies.get('user_login')
    
    axios.post('/api/challenge-save-data', {
      user_avatar,
      user_name,
      user_login,
      user_id,
      level, 
      currentExperience, 
      challengesCompleted
    }).then()

  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const index = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[index]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `valendo ${challenge.amount} exp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return

    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceNextleval) {
      levelUp()
      finalExperience = finalExperience - experienceNextleval
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  function setInitialData({ level, currentExperience, completeChallenge }) {
    setLevel(level)
    setCurrentExperience(currentExperience)
    setChallengesCompleted(completeChallenge)
  }

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceNextleval,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      setInitialData,
      closeLevelUpModal
    }}>
      {children}

      { isLevelUpModalOpen && (<LevelUpModal />) }
    </ChallengesContext.Provider>
    
  )
}

export default ChallengesContext
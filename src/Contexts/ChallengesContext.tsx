import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProvideProps { children: ReactNode }
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
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
}
const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children } : ChallengesProvideProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceNextleval = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
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
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export default ChallengesContext
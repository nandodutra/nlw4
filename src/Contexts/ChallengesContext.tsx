import { createContext, useState, ReactNode } from 'react'
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
}
const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children } : ChallengesProvideProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceNextleval = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const index = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[index]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
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
      resetChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export default ChallengesContext
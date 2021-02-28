import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import ChallengesContext from './ChallengesContext';

interface CountdownContextData {
  isActive: boolean,
  hasFinished: boolean,
  minutes: number,
  seconds: number,
  handleCountdown: () => void,
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

let countdownTimeout = null;

const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children } : CountdownProviderProps) {
  const {  startNewChallenge } = useContext(ChallengesContext)
  const cycleTime = 6 * 60;
  const [time, setTime] = useState(cycleTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    if (time > 0 && isActive) {
      countdownTimeout = setInterval(() => {
        setTime(time - 1)
      }, 1000)
  
      return () => {
        clearInterval(countdownTimeout)
      }
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
    }
  }, [time, isActive])

  function handleCountdown() {
    if (isActive) {
      setTime(cycleTime)
      clearInterval(countdownTimeout)
    }

    setIsActive(!isActive)
  }

  function resetCountdown() {
    setIsActive(false)
    setHasFinished(false)
    setTime(cycleTime)
  }
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      hasFinished,
      resetCountdown,
      handleCountdown
    }}>
      { children }
    </CountdownContext.Provider>
  )
}

export default CountdownContext

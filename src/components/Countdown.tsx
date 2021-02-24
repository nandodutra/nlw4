import { useEffect, useState, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import ChallengesContext from '../Contexts/ChallengesContext'

let countdownTimeout = null;

export default function Countdown() {
  const { level, levelUp, currentExperience, challengesCompleted, startNewChallenge } = useContext(ChallengesContext)
  const cycleTime = 0.1 * 60;
  const [time, setTime] = useState(cycleTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
      alert('Terminou ciclo')
    }
  }, [time, isActive])

  function handleCountdown() {
    if (isActive) {
      setTime(cycleTime)
      clearInterval(countdownTimeout)
    }

    setIsActive(!isActive)
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight || 0}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight || 0}</span>
        </div>
      </div>

      

      { hasFinished ? (
        <button 
        type="button" 
        disabled
        className={styles.countdownButton}>Ciclo encerrado</button>
      ) : (
        <>
          { isActive ? (
            <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={handleCountdown}>Abandonar ciclo</button>
          ) : (
            <button 
            type="button" 
            className={styles.countdownButton}
            onClick={handleCountdown}>Iniciar um ciclo</button>
          ) }
        </>
      ) }
    </div>
  )
}
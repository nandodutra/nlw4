import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import CountdownContext from '../Contexts/CountdownContext';

export default function Countdown() {
  const { 
    isActive, 
    hasFinished, 
    handleCountdown, 
    minutes, seconds 
  } = useContext(CountdownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
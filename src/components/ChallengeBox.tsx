import { useContext } from 'react';
import ChallengesContext from '../Contexts/ChallengesContext';
import CountdownContext from '../Contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
  const { resetCountdown } = useContext(CountdownContext)
  const { resetChallenge, activeChallenge, completeChallenge } = useContext(ChallengesContext)

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}exp</header>

          <main>
            <img src={ `icons/${activeChallenge.type}.svg` } />
            <strong>Novo desafio</strong>
            <p>{ activeChallenge.description }</p>
          </main>

          <footer>
            <button 
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeFiledButton}>Falhei</button>

            <button 
              type="button"
              onClick={handleChallengeSucceeded}
              className={styles.challengeSucceededButton}>Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Finalize um ciclo
            para receber desafios a
            serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Avance de nível completando desafios.
          </p>
        </div>
      ) }
    </div>
  )
}
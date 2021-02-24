import { useContext } from 'react';
import ChallengesContext from '../Contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
  const { resetChallenge, activeChallenge } = useContext(ChallengesContext)

  const hasActiveChallenge = true;
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
              onClick={resetChallenge}
              className={styles.challengeFiledButton}>Falhei</button>

            <button 
              type="button"
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
import { useContext } from 'react'
import ChallengesContext from '../Contexts/ChallengesContext'
import styles from '../styles/components/CompleteChallenges.module.css'

export default function CompleteChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext)

  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
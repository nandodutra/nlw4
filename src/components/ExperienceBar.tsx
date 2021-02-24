import { useContext } from 'react'
import ChallengesContext from '../Contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar() {
  const { currentExperience, experienceNextleval } = useContext(ChallengesContext)
  const currentPercent = (currentExperience * 100) / experienceNextleval

  return (
    <header className={styles.experienceBar}>
      <span>0 exp</span>
      <div>
        <div style={{ width: `${currentPercent}%` }} />
        <span className={styles.currentExperience} style={{ left: `${currentPercent}%` }}>{currentExperience} exp</span>
      </div>
      <span>{experienceNextleval} exp</span>
    </header>
  )
}
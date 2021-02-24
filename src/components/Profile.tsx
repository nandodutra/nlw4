import styles from '../styles/components/Profile.module.css'

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Profile"/>
      <div>
        <strong>John Doe</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1</p>
      </div>
    </div>
  )
}
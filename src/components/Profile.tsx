import { useContext, useEffect, useState } from 'react'
import ChallengesContext from '../Contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'
import Cookies from 'js-cookie'

interface UserType {
  name: string,
  avatar: string
}

export default function Profile() {
  const { level } = useContext(ChallengesContext)
  const [user, setUser] = useState({} as UserType)

  useEffect(() => {
    const name = Cookies.get('user_name')
    const avatar = Cookies.get('user_avatar')

    setUser({
      name,
      avatar
    })
  }, [])

  return (

    <div className={styles.profileContainer}>
      <img src={user.avatar} alt="Profile"/>
      <div>
        <strong>{user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level { level }</p>
      </div>
    </div>
  )
}
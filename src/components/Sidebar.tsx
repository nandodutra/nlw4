import { useState } from 'react'
import styles from '../styles/components/Sidebar.module.css'

export default function Sidebar() {
  const [active, setActive] = useState('home')

  return (
    <div className={styles.Sidebar}>
      <a href="/"><img src="./logo-blue.svg" alt="Move.it" /></a>

      <nav>
        <ul>
          <li>
            { active === 'home' ? (
              <a href="#">
                <div />
                <img src="./icons/home-blue.svg" alt="Home"/>
              </a>) : (
                <a href="#">
                  <img src="./icons/home.svg" alt="Home"/>
                </a>
              ) }
          </li>
          <li>
            { active === 'best' ? (
              <a href="#">
                <div />
                <img src="./icons/best-blue.svg" alt="Melhores"/>
              </a>) : (
                <a href="#">
                  <img src="./icons/best.svg" alt="Melhores"/>
                </a>
              ) }
          </li>
        </ul>
      </nav>
    </div>
  )
}
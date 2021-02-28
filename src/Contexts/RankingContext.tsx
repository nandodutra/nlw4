import axios from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface RankigContextProps {
  list: Array<any>
}

const RankingContext = createContext({} as RankigContextProps)

interface RankingProviderProps {
  children: ReactNode
}

export function RankingProvider({ children } : RankingProviderProps) {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('/api/ranking')
      .then(resp => {
        setList(resp.data)
      })
  }, [])

  return (
    <RankingContext.Provider value={{
      list
    }}>
      { children }
    </RankingContext.Provider>
  )
}

export default RankingContext
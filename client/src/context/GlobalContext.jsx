import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [partecipanti, setPartecipanti] = useState([])


  function fetchPartecipanti() {
    axios.get('http://localhost:3000/api/fantacalcio')
      .then(res => {
        setPartecipanti(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchPartecipanti()
  }, [])

  return (
    <GlobalContext.Provider value={{ partecipanti, setPartecipanti, fetchPartecipanti }}>
      {children}
    </GlobalContext.Provider>
  )



}
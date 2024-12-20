import { useState } from 'react'
import Countdown from "./Countdown"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Countdown/>
    </>
  )
}

export default App

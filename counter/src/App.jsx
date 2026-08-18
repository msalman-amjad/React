import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)
  const [errorMsg, SetErrorMsg] = useState("")

  const addValue = () => {

    if (counter < 20) {
      setCounter(counter + 1);
      SetErrorMsg("")
    } else {
      // Otherwise, stop and log the message
      SetErrorMsg("Cant Add to Counter")
    }
  }


  const subtractValue = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      SetErrorMsg("")
    } else {
      // Otherwise, stop and log the message
      SetErrorMsg("Cant Subtract from counter below 0")
    }
  }

  return (
    <>
      <h1>SALMAN REACT</h1>
      <h2>counter value : {counter}</h2>
      <h3 style={{ color: 'red' }}>{errorMsg}</h3>
      <button onClick={addValue}> Add value</button>
      <br />
      <button onClick={subtractValue}>Subtract value</button>
    </>
  )
}

export default App

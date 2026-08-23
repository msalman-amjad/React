import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [charAllowed, setChar] = useState(false)
  const [password, setPassword] = useState("")
  //useRef
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, charAllowed, passwordGenerator])


  return (
    <>
      <h1 className='text-4xl text-center' >Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          {/* 2. Added bg-white to the input so it stands out, and text-gray-800 for readable typing */}
          <input
            type="text"
            value={password}
            className='outline-none mt-3 w-full py-1 px-3 bg-white text-gray-800'
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none mt-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-0.5 shrink-0 transition-colors">Copy</button>
        </div>
        <div className='flex text-sm gap-x-4 mt-4'>

          {/* Slider Container */}
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Checkbox 1 Container (Fixed className and items-center) */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id="charachterInput"
              onChange={() => {
                setChar((prev) => !prev) // Note: Fixed the function name here too!
              }}
            />
            <label htmlFor="charachterInput">Character</label>
          </div>

          {/* Checkbox 2 Container (Fixed className and items-center) */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={number}
              id="NumberInput"
              onChange={() => {
                setNumber((prev) => !prev) // Note: Fixed the function name here too!
              }}
            />
            <label htmlFor="NumberInput">Number</label>
          </div>
        </div>

      </div>




    </>
  )
}

export default App

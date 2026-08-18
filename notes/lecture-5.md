# Lecture 5: Why We Need Hooks & `useState`

**Source:** Chai aur Code

**Overview:** Learning React hooks is like cricket practice—you adjust your techniques based on playing conditions. You only need to learn a hook when you encounter the specific problem it is designed to solve. This lecture introduces the fundamental problem of UI updates and solves it using the `useState` hook.

## 1. Key Concepts

* **The Problem (UI Synchronization):** Standard JavaScript variables can update data in the background, but React does not automatically know about those changes. Therefore, regular variables will not trigger the UI to redraw and show the new data.
* **The Solution (Hooks):** React provides specialized methods called "Hooks" to solve this. The `useState` hook is your primary tool for syncing state changes with the DOM so the screen updates instantly.
* **Naming Conventions:** When creating a state variable, the standard practice is to name the variable and its setter function clearly (e.g., `counter` and `setCounter`). This is not a strict React rule, but it is an industry standard for readability.

---

## 2. Project Implementation: The Counter App

The lecture assignment is to build a counter using Vite that strictly stays between `0` and `20`. Here is the complete implementation of your code, broken down so it is easy to review later.

### The Code Breakdown

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  // 1. Initializing State
  // 'counter' holds the number. 'setCounter' is the function that updates it.
  // We start the counter at 15.
  let [counter, setCounter] = useState(15);
  
  // 'errorMsg' holds any warning text. 'SetErrorMsg' updates it.
  // We start with an empty string so no error shows initially.
  const [errorMsg, SetErrorMsg] = useState("");

  // 2. The Addition Logic (Max Limit 20)
  const addValue = () => {
    if (counter < 20) {
      setCounter(counter + 1); // Updates UI with new number
      SetErrorMsg(""); // Clears any previous error
    } else {
      SetErrorMsg("Cant Add to Counter"); // Stops at 20 and shows error
    }
  }

  // 3. The Subtraction Logic (Min Limit 0)
  const subtractValue = () => {
    if (counter > 0) {
      setCounter(counter - 1); // Updates UI with new number
      SetErrorMsg(""); // Clears any previous error
    } else {
      SetErrorMsg("Cant Subtract from counter below 0"); // Stops at 0 and shows error
    }
  }

  // 4. Rendering the UI
  return (
    <>
      <h1>SALMAN REACT</h1>
      <h2>counter value : {counter}</h2>
      
      {/* Displays the error message dynamically in red */}
      <h3 style={{ color: 'red' }}>{errorMsg}</h3>
      
      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={subtractValue}>Subtract value</button>
    </>
  )
}

export default App;
```

### How This Works (Beginner Summary)
* **`useState()`:** Tells React, "Create a tracker for a piece of data." You give it an initial starting point, and it gives you back the variable to read it, and a specific function to change it.
* **The Constraints (`if/else`):** Inside the `addValue` and `subtractValue` functions, the `if` statements act as boundary guards. They check the current number before allowing the math to happen, ensuring the counter never breaks past 20 or drops below 0.
* **The Magic of the Setter (`setCounter`):** You must never write `counter = counter + 1`. Instead, you pass the math into `setCounter()`. When React sees a setter function called, it immediately repaints the HTML tags on the screen with the brand new data.
# Lecture 8: React State Batching & Functional Updates (The Classic Interview Question)

**Source:** Chai aur Code

**Overview:** This lecture dives into one of the most famous and frequently asked React interview questions. It explores why calling a state setter function multiple times in a row might not work as you expect due to **State Batching [grouping multiple state updates together into a single update for better performance]**, and how to solve it using **Functional Updates [passing a callback function to the state setter to always get the most recent, up-to-date state value]**.

---

## 1. The Interview Question Scenario

Imagine an interviewer asks you: 
> *"What will happen if I call `setCounter(counter + 1)` four times consecutively inside a single button click function? By how much will the counter increase: 1 or 4?"*

```jsx
const addValue = () => {
  setCounter(counter + 1);
  setCounter(counter + 1);
  setCounter(counter + 1);
  setCounter(counter + 1);
};
```

### The Initial Guess vs. Reality:
* **The Common Guess:** It should increase by 4 (because `+1` is written 4 times).
* **The Reality:** It increases by **only 1**!

---

## 2. The Root Cause: State Batching

### Why does this happen?
React does not immediately re-render the entire component the exact microsecond you call `setCounter()`. 

1. **Batching [combining multiple operations together into one bundle]:** React collects all state updates triggered within the same event handler (like a button click) and packages them into a single batch.
2. **Duplicate Work Optimization:** In the code above, the value of `counter` hasn't changed yet while the function is still executing. 
   - If `counter` is currently `15`:
     - Line 1 says: `setCounter(15 + 1)` -> update to 16
     - Line 2 says: `setCounter(15 + 1)` -> update to 16
     - Line 3 says: `setCounter(15 + 1)` -> update to 16
     - Line 4 says: `setCounter(15 + 1)` -> update to 16
   - Through its **Fiber Reconciliation Algorithm [React's internal engine that compares changes and optimizes updates]**, React looks at the batch and says: *"All 4 calls are asking me to do the exact same calculation (`15 + 1 = 16`). I will only perform this update once to avoid unnecessary calculations and screen repaints."*

> **Real-World Analogy:**
> If you ask your friend 4 times in a single second: *"Can you fetch me glass #16 of water?"*, they won't bring you 4 separate glasses—they will simply bring you glass #16 once.

---

## 3. The Solution: Functional Updates

To update the state multiple times sequentially, you cannot pass a static value. Instead, you must pass a **Callback Function [a function passed as an argument to another function, which will be executed later]** inside the state setter.

### The Correct Syntax:
```jsx
const addValue = () => {
  // 'prevCounter' gets the guaranteed, fresh state from the execution queue
  setCounter((prevCounter) => prevCounter + 1);
  setCounter((prevCounter) => prevCounter + 1);
  setCounter((prevCounter) => prevCounter + 1);
  setCounter((prevCounter) => prevCounter + 1);
};
```

### Why this works:
* When you pass a callback function to `setCounter`, React places each callback into an internal **Update Queue [a line of tasks waiting to be executed in order]**.
* React promises that for each callback, it will supply the **Previous State [the actual state after the previous update has finished computing]** as the argument (`prevCounter`).
* **Step-by-step execution (starting at 15):**
  1. Call 1: `prevCounter` is `15` -> Returns `15 + 1 = 16`
  2. Call 2: `prevCounter` is now `16` -> Returns `16 + 1 = 17`
  3. Call 3: `prevCounter` is now `17` -> Returns `17 + 1 = 18`
  4. Call 4: `prevCounter` is now `18` -> Returns `18 + 1 = 19`
* Now, clicking the button increases the counter by **4**!

---

## 4. Complete Code Comparison

Here is a full React component demonstrating both approaches side by side:

```jsx
import { useState } from 'react';

function CounterDemo() {
  const [counter, setCounter] = useState(15);

  // ❌ INCORRECT APPROACH: Increments by only 1 (Batched by React)
  const addValueBatched = () => {
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  };

  // ✅ CORRECT APPROACH: Increments by 4 (Sequential Functional Updates)
  const addValueSequential = () => {
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decreaseValue = () => {
    // You can also use functional updates for single updates (best practice when new state depends on old state)
    setCounter((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Counter: {counter}</h1>
      
      {/* Increases counter by only 1 */}
      <button onClick={addValueBatched}>
        Add (+1 only due to batching)
      </button>

      <br /><br />

      {/* Increases counter by 4 */}
      <button onClick={addValueSequential}>
        Add (+4 using functional updates)
      </button>

      <br /><br />

      <button onClick={decreaseValue}>
        Decrease (-1)
      </button>
    </div>
  );
}

export default CounterDemo;
```

---

## 5. Golden Rules to Remember (Summary)

1. **State Updates are Asynchronous [they do not happen immediately on the spot; React schedules them for the right moment]**: Never rely on `counter` to hold the newly updated number on the very next line of code inside the same function.
2. **Direct State Setter (`setCounter(value)`):** Best when setting a completely new, independent value (e.g., `setName("Ali")` or `setIsLoggedIn(true)`).
3. **Functional State Setter (`setCounter(prev => prev + 1)`):** **Always use this** whenever your new state value depends on the previous state value.
4. **Parameter Naming:** You can name the callback parameter anything you like (`prevCounter`, `prev`, `count`), but naming it `prevCounter` or `prevState` makes your intent crystal clear to anyone reading your code.

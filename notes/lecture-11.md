# Lecture 11: Currency Converter Project & Custom Hooks

**Source:** Chai aur Code

**Overview:** This lecture demonstrates how to build a practical Currency Converter project in React. It focuses heavily on creating custom hooks, designing reusable components, managing state, and integrating real-world APIs to fetch live currency exchange rates.

---

## 1. Project Setup and Custom Hooks
* **Custom Hooks [JavaScript functions that start with "use" and allow you to extract reusable component logic]** are a powerful way to keep your components clean.
* In this project, we create a `useCurrencyInfo` hook to fetch data from an API.
* We use **`useEffect` [a hook that lets you perform side effects in function components]** to trigger the API fetch whenever the selected base currency changes.

> **Real-World Analogy:**
> Think of a custom hook like a dedicated assistant. Instead of doing all the heavy lifting yourself (fetching data, handling responses), you ask your assistant to do it, and they just hand you the finished result whenever you need it.

```javascript
import { useEffect, useState } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
        console.log(data)
    }, [currency])
    return data
}
export default useCurrencyInfo
```

---

## 2. Reusable Components & Optimized Rendering
* **Component Architecture [designing your UI in small, independent, and reusable blocks]** is key to writing clean React code.
* We designed an `InputBox` component to act as both our "From" and "To" currency input fields. It accepts **Props [arguments passed into React components]** such as `label`, `amount`, `onAmountChange`, and `currencyOptions`.
* **Optimized Rendering [preventing unnecessary updates to the user interface]** is achieved by passing a `key` prop when iterating over an array (using `.map()`). This helps React quickly identify which items have changed, been added, or been removed.

```jsx
// Example of iterating with keys inside our InputBox component
{currencyOptions.map((currency) => (
    <option key={currency} value={currency}>
        {currency}
    </option>
))}
```

---

## 3. State Management and Core Functionality
* We introduced the **`useId` Hook [a React hook used to generate unique IDs, great for accessibility]** to securely link HTML labels to their respective input elements.
* The main `App` component manages several **States [variables that React monitors for changes to update the screen]**: `amount`, `from` currency, `to` currency, and `convertedamount`.
* We implemented a `swap` function to exchange the "From" and "To" values.

```jsx
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedamount)
  }
```

* Our main conversion logic updates the result using the live rates whenever the user clicks the "Convert" button.

---

## 4. Complete Code Implementation

Here is the implementation of our main `App.jsx`, which combines all our states and hooks together:

```jsx
import { useState, useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("pkr")
  const [convertedamount, setConvertedAmount] = useState(0)
  const currencyinfo = useCurrencyInfo(from)
  const options = Object.keys(currencyinfo)
  
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedamount)
  }

  const convert = () => {
    if (currencyinfo && currencyinfo[to]) {
      setConvertedAmount(amount * currencyinfo[to])
    }
  }

  // Auto-convert when values change
  useEffect(() => {
    convert()
  }, [amount, to, from, currencyinfo])


  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedamount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
```

---

## 5. Golden Rules to Remember
1. **Always use a `key` prop** when rendering lists with `.map()` in React to boost performance and prevent rendering bugs.
2. Custom hooks should always start with the word `use` so React knows it's a hook.
3. Don't forget to link your labels and inputs properly—`useId` is a great tool for generating unique, accessible IDs!
4. **Assignments:** 
   - Add a nice image to the left side of your conversion card to enhance the UI.
   - We updated the initial state so the app defaults to converting between **USD** and **PKR**.

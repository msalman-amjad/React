# Lecture 9: React Project - Background Color Changer App

**Source:** Chai aur Code

**Overview:** This lecture shifts from pure theory to building a complete, interactive, hands-on React project—a **Background Color Changer** application using **React (`useState`)** and **Tailwind CSS**. It covers fundamental concepts of UI state management, dynamic inline styling in JSX, and a crucial JavaScript/React event handling interview concept: why you must pass a callback function to `onClick` when passing parameters.

---

## 1. Project Setup & Prerequisites

Building this project requires setting up a clean React environment with Tailwind CSS for utility-first styling.

* **Vite Initialization:** The project is initialized using Vite (`04bgChanger`). Vite provides instant server start times and fast Hot Module Replacement (HMR).
* **Tailwind CSS Configuration:** Tailwind is installed and configured in `tailwind.config.js` to scan template paths (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`).
* **Tailwind Directives [special CSS keywords that inject Tailwind's pre-made style rules into your app]:** Added directly at the top of `src/index.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

## 2. Core Concepts & State Management

### A. Reactive State Management
In standard JavaScript, changing a background color requires selecting an HTML element (`document.body.style.backgroundColor = "red"`). In React, we rely on **State Management [tracking and updating dynamic data on the screen so React automatically redraws the UI when changes occur]**.

```jsx
const [color, setColor] = useState("olive");
```
* **`color`:** The state variable that stores the current background color string (starts with `"olive"`).
* **`setColor`:** The setter function used to update the color state.

### B. Dynamic Inline Styling in JSX
To apply the state variable directly to an HTML element's background, we use JSX inline styling:

```jsx
<div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
```

> **Why Double Curly Braces `{{ ... }}` in JSX?**
> * **Outer Braces `{}`:** Tells JSX to switch from HTML mode into JavaScript execution mode.
> * **Inner Braces `{}`:** Creates a plain JavaScript **Object Literal [a key-value pair bundle in JavaScript]** representing CSS properties (`{ backgroundColor: color }`).

---

## 3. Event Handling: The Function Callback Trap (Classic Interview Question)

A frequent pitfall for beginners—and a common technical interview question—revolves around how event handlers like `onClick` execute functions.

### The Common Mistake vs. The Solution

#### ❌ Incorrect Approach 1: Direct Execution
```jsx
<button onClick={setColor("red")}>Red</button>
```
* **Why it fails:** `setColor("red")` calls the function **immediately** as the component renders on the screen! It doesn't wait for a user click. The return value of `setColor` (which is `undefined`) gets assigned to `onClick`. Worse, updating state during render triggers an infinite re-render loop that crashes the application.

#### ❌ Incorrect Approach 2: Direct Function Reference (Without Parameters)
```jsx
<button onClick={setColor}>Red</button>
```
* **Why it fails:** Passing `setColor` directly without parentheses will pass the browser's `PointerEvent` object as an argument into `setColor`. Your state becomes an `Event` object instead of the color string `"red"`.

#### ✅ Correct Approach: Passing an Anonymous Callback Function
```jsx
<button onClick={() => setColor("red")}>Red</button>
```
* **Why it works:** Wrapping `setColor("red")` inside an **Anonymous Callback Function [a function without a name defined inline to be executed only when triggered]** hands React a reference to a function. React holds onto this callback and executes `setColor("red")` **only when the user actually clicks the button**.

> **Real-World Analogy:**
> Imagine handing someone a light switch. Passing `setColor("red")` directly is like flipping the switch immediately while handing it over. Passing `() => setColor("red")` is like handing them the switch with instructions: *"Only flip this switch when you choose to press it."*

---

## 4. Complete Code Implementation

Here is the complete, self-contained `App.jsx` file for the Background Color Changer application.

```jsx
import { useState } from "react";

function App() {
  const [color, setColor] = useState("Yellow");

  return (
    <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button 
            onClick={() => setColor("red")} 
            className="outline-none px-4 py-4 rounded-full text-white shadow-lg" 
            style={{ color: "red" }}
          >
            Red
          </button>
          
          <button 
            onClick={() => setColor("blue")} 
            className="outline-none px-4 py-4 rounded-full text-white shadow-lg" 
            style={{ color: "blue" }}
          >
            Blue
          </button>
          
          <button 
            onClick={() => setColor("green")} 
            className="outline-none px-4 py-4 rounded-full text-white shadow-lg" 
            style={{ color: "green" }}
          >
            Green
          </button>
          
          <button 
            onClick={() => setColor("black")} 
            className="outline-none px-4 py-4 rounded-full text-white shadow-lg" 
            style={{ color: "black" }}
          >
            Black
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

## 5. Golden Rules to Remember (Summary)

1. **State Triggers UI Repaints:** Never modify DOM styles manually (`document.body.style...`) in React. Store the property in state (`useState`) and let React seamlessly re-render the view.
2. **Double Curlys `style={{ ... }}`:** The outer pair enters JavaScript mode in JSX; the inner pair creates a CSS style object.
3. **Always Use Callbacks for Parameterized Events:** If an `onClick` handler needs arguments (e.g., `setColor("red")`), wrap it inside an arrow function `() => setColor("red")` so it executes on user click, not on component render.
4. **Tailwind Responsiveness & Utility Classes:** Combine Tailwind utilities like `fixed`, `bottom-12`, `inset-x-0`, and `rounded-3xl` to build modern responsive control bars cleanly without custom CSS files.

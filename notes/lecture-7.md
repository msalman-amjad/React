# Lecture 7: Tailwind CSS & Props

**Overview:** This video marks the conclusion of the foundational React series. It shifts the focus from foundational theory to practical application [building real, working projects], covering how to style applications easily and how to make components reusable.

---

## 1. Tailwind CSS Configuration
Setting up Tailwind CSS in a Vite-based React project involves three main steps:
* **Installation:** Downloading the required packages via the terminal.
* **Configuration:** Setting up the `tailwind.config.js` file so Tailwind knows exactly which files to look at for your styling classes.
* **Tailwind Directives [special Tailwind keywords that inject its styles]:** Adding the base Tailwind layers into your `index.css` file so the styling system is applied globally across your entire app.

## 2. Working with Props (Properties)
**Props** [properties or custom data passed down from a parent component to a child component] are the secret to building scalable React apps.
* **Reusable Components [writing code once and using it multiple times with different data]:** Instead of writing the HTML for a card 10 times, you write it once and pass different props to it. 
* **Dynamic Data [information that can change, unlike fixed text]:** Props allow components to display unique data (like different user names or button text) rather than relying on **Hardcoded content [fixed, unchanging text written directly into the code]**.

### Code Example: Passing Props (Parent Component)
In `App.jsx`, we pass different types of data (strings, objects, and arrays) down to the `Card` component.

```jsx
import './App.css'
import Card from './components/card'

function App() {
  // We can pass complex data types like objects...
  let myobj = {
    name: 'salman',
    age: 21
  }
  
  // ...and arrays via props!
  let arr = [1, 2, 3, 4, 5]
  
  return (
    <>
      <h1 className='bg-green-400 mt-10 text-black p-4 rounded-xl mx-auto w-fit mb-10'> 
        Tailwind test 
      </h1>
      
      {/* Passing the data as attributes (props) to the Card component */}
      <Card name="salman-test1" someobj={myobj} somearr={arr} />
    </>
  )
}

export default App
```

## 3. Component Structure & Receiving Props
To keep your code organized, you separate UI elements into their own files (like `Card.jsx`). The child component then receives the data using **Parameters [variables inside the parentheses of a function that accept incoming data]**.

### Code Example: Receiving Props (Child Component)
The `Card` function accepts `props` as an argument. All the attributes you passed from `App.jsx` are bundled inside this single `props` object.

```jsx
import React from 'react'

// The 'props' parameter catches all data passed from the parent (App.jsx)
function Card(props) {
    // Check the browser console to see your object, array, and string!
    console.log("props", props) 
    
    return (
        <div className="max-w-xs rounded-md shadow-md bg-black mx-auto text-gray-100">
            <img
                src="https://picsum.photos/301"
                alt=""
                className="object-cover object-center w-full rounded-t-md h-30 bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    {/* Note: You can replace the hardcoded "Lorem" below with {props.name} to make it dynamic */}
                    <h2 className="text-3xl font-semibold tracking-wide">Lorem</h2>
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
                        tempora ipsum soluta amet corporis accusantium aliquid consectetur
                        eaque!
                    </p>
                </div>
                <button
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-800 text-gray-200"
                >
                    Read more
                </button>
            </div>
        </div>
    )
}
export default Card
```

## 4. Default Values
When building reusable components, there is always a chance someone forgets to pass a prop, or a network request fails to load the data. 
To ensure stability and prevent the app from crashing, you can assign **Default Values [fallback or backup data that is used automatically if nothing else is provided]** directly within the component function parameters.
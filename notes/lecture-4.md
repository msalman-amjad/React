# Lecture 4: How React Works Under the Hood

**Source:** Chai aur Code

**Overview:** React can feel like magic, but at its core, it is essentially a collection of standard JavaScript functions. By building a simplified, custom version of React from scratch, we can see exactly how it converts our code into the websites we see on screen.

## Key Concepts Covered

* **React is Just JavaScript (20:00):** You do not need magic to understand React. Everything React does behind the scenes is just vanilla JavaScript manipulating the DOM.
* **How Elements are Created (7:15, 30:50):** When you write UI components, React turns them into plain JavaScript objects that represent the structure of your app (the "Virtual DOM tree"). React has a built-in method called `React.createElement` that handles this conversion.
* **The Custom Renderer (10:00):** To prove how React works, we can build a `customRender` function. This function takes a JavaScript object (the blueprint) and uses standard DOM commands (`document.createElement`, `appendChild`) to manually inject it into the browser's Real DOM.
* **JSX Explained (21:00):** JSX looks like HTML inside JavaScript, but it is just "syntactic sugar". Browsers cannot read it. Tools like Babel automatically convert your JSX into those plain JavaScript objects before the browser ever sees it.
* **Exploring the Source (43:00):** Looking directly at the actual React source code on GitHub shows where methods like `createElement` are defined. It proves that React is just code you can read and learn from.

---

## The "Custom React" Code Explained

Here is the exact code demonstrating how React takes a JavaScript blueprint and paints it onto the screen:

### 1. The HTML Container
React needs a place to inject the UI.
```html
<!-- index.html -->
<body>
  <div id="root"></div>
</body>
```

### 2. The Blueprint (Virtual DOM)
React converts our JSX into a JavaScript object like this:
```javascript
const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'click me to visit google'
};
```

### 3. The Custom Renderer (The Engine)
This function mimics React's built-in rendering engine. It translates the object into real HTML.
```javascript
function customRender(reactElement, container) {
    // 1. Create a blank HTML tag based on the blueprint (e.g., <a></a>)
    const domElement = document.createElement(reactElement.type);
    
    // 2. Inject the text inside the tag
    domElement.innerHTML = reactElement.children;
    
    // 3. Attach all the properties (href, target, etc.) using a loop
    for (const prop in reactElement.props) {
        domElement.setAttribute(prop, reactElement.props[prop]);
    }
    
    // 4. Push the finished HTML element onto the real webpage
    container.appendChild(domElement);
}

// Grab the root div and run the engine!
const mainContainer = document.querySelector('#root');
customRender(reactElement, mainContainer);
```

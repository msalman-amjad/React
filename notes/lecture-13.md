### Video Summary: Context API Crash Course

**Source:** *Chai aur Code* (YouTube Channel)
**Lecture Number:** This video is part of a React series (specifically covering the Context API).

This tutorial provides a comprehensive guide to mastering the **React Context API** through two practical, hands-on projects. The instructor emphasizes that understanding props and their limitations is the necessary starting point before moving to state management libraries like *Redux* or *Zustand*.

---

#### Project 1: User Context Setup
This project focuses on global state management for a user's data. 

* **Creating the Context:** You define a context using `createContext()` from the *React* library. 
* **Providing the Context:** The context is then exported as a provider. You use this to wrap your components in the main `App.jsx` file to grant them access to the global data.
* **Accessing Data:** Using the `useContext` hook in child components allows you to consume the shared state easily.

**Code Snippet (Context Definition):**
```javascript
import React, { createContext } from 'react';

const UserContext = createContext();
export default UserContext;
```

#### Project 2: Theme Toggler with Tailwind CSS
This project demonstrates how to toggle between **Light** and **Dark modes** across the entire application using the Context API and *Tailwind CSS*.

* **Single File Pattern:** Unlike the first project, this approach combines the context and the provider into a single, cleaner module.
* **Custom Hooks:** The video introduces a custom hook pattern (`useTheme`) to simplify importing the context throughout the app.
* **Tailwind Configuration:** A crucial step is configuring the *Tailwind* config file to support the `class` dark mode strategy, ensuring the CSS toggles correctly based on the state.

**Code Snippet (Custom Hook):**
```javascript
export default function useTheme(){
    return useContext(ThemeContext)
}
```

**Key Takeaway:** The instructor demonstrates that global state management, when handled via the Context API, effectively removes the need for manual prop-drilling, leading to cleaner, more maintainable *React* architectures.

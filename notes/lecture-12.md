# Lecture 12: React Router Crash Course

**Source:** Chai aur Code

**Overview:** This video serves as a comprehensive crash course on React Router, focusing on building a practical application rather than just UI cloning. The instructor emphasizes using libraries like *React Router DOM* to manage routing, loaders, and dynamic parameters in a *React* application.

---

## 1. Project Setup and Routing
* **Project Setup:** The project is initiated using *Vite* and *Tailwind CSS*. The instructor notes that for a *React*-focused project, the goal is to handle functionality and APIs, not just CSS styling.
* **Navigation & Routing:** The core of the tutorial involves setting up the `main.jsx` file to define routes using `createBrowserRouter` and `RouterProvider`. The instructor demonstrates two ways to define routes: using an array of objects or `createRoutesFromElements`.

```jsx
// Router Configuration (main.jsx)
const router = createBrowserRouter(
  createRoutesFromElements(
    // Routes go here
  )
)
```

---

## 2. Layouts, Outlet, and Navigation Links
* **Layout & Outlet:** A `Layout` component is created, which acts as a wrapper for the `Header` and `Footer`. By using the `Outlet` component from *React Router*, the application maintains a consistent header and footer while dynamically updating the inner content based on the active URL.
* **Active Links:** To highlight the currently active navigation link, the `NavLink` component is used with a callback function that provides an `isActive` property to conditionally apply CSS classes.

---

## 3. Dynamic Parameters and Loaders
* **Dynamic Parameters:** The tutorial covers capturing data from the URL (e.g., `/user/:userid`) using the `useParams` hook. This is essential for building dynamic pages like profile views.

```jsx
// Dynamic Parameter Extraction (User.jsx)
import { useParams } from 'react-router-dom';
const { userid } = useParams();
```

* **Data Loading (Loaders):** A more optimized approach to fetching API data is demonstrated using the `loader` property in route definitions. This fetches data *before* the component renders, preventing UI lags. The associated hook `useLoaderData` is used to retrieve this data within the component.

```jsx
// Optimized Data Fetching (Github.jsx)
export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/hiteshchoudhary');
  return response.json();
}

// Usage in component
const data = useLoaderData();
```

---

## 4. Golden Rules to Remember
1. **Always use an `Outlet`** to create wrapper layouts that persist across route changes (like persistent headers and footers).
2. The `loader` function is highly optimized and initiates data fetching before the component even mounts, preventing jarring loading states.
3. Use `NavLink` over standard anchor tags or basic `Link` components when you need to style the active state of navigation links dynamically based on the current URL.

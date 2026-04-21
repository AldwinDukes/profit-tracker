import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Preview from "./components/Preview.jsx";
import FormAdd from "./components/FormAdd.jsx";

//import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },

//   {
//     path: "/preview",
//     element: <Preview />,
//   },
//   {
//     path: "/form-add",
//     element: <FormAdd />,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>,
);

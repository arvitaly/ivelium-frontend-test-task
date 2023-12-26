import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/index/page.tsx";
import LoginPage from "./pages/login/page.tsx";
import RepoPage from "./pages/repo/page.tsx";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import App from "./App.tsx";
import AuthApp from "./AuthApp.tsx";
import LogoutPage from "./pages/logout/page.tsx";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "",
        element: <AuthApp />,
        children: [
          {
            path: "",
            element: <IndexPage />,
          },

          {
            path: "repo/:ownerName/:repoName",
            element: <RepoPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

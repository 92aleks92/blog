import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ArticleDetail from "./client/articleDetail";
import ArticleList from "./admin/articleList";
import Login from "./client/login";
import ClientArticleList from "./client/articleList";
import "bootstrap/dist/css/bootstrap.min.css";
import GuardRoute from "./hoc/guardRoute";
import ArticleForm from "./admin/articleForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to={"articles"} />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "articles",
      element: <ClientArticleList />,
      children: [],
    },
    {
      path: "articles/:id",
      element: <ArticleDetail />,
    },
    {
      path: "admin",
      children: [
        {
          path: "articles",
          element: (
            <GuardRoute>
              <ArticleList />
            </GuardRoute>
          ),
          children: [],
        },
        {
          path: "articles/:id/edit",
          element: (
            <GuardRoute>
              <ArticleForm />
            </GuardRoute>
          ),
        },
        {
          path: "new-article",
          element: (
            <GuardRoute>
              <ArticleForm />
            </GuardRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

import NotFound from "./pages/notFound/NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Meeting from "./pages/meetings/Metting";
import MainLayout from "./pages/layouts/MainLayout";
import AuthLayout from "./pages/layouts/AuthLayout";
import ProtectedRoute from "./components/protectedRoute";
import MeetingsByUser from "./pages/dashboard/MeetingsByUser";
import Statistics from "./pages/statistics/Statistics";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/usuario/:usuarioId",
            element: <MeetingsByUser />,
          },
          {
            path: "/statistics",
            element: <Statistics />,
          },
          {
            path: "/meetings",
            element: <Meeting />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Analytics />
    </QueryClientProvider>
  </React.StrictMode>,
);

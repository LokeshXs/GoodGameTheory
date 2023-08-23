import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginComponent";
import "./App.css";
import LoginPage from "./pages/login";
import RootLayout from "./pages/root";
import ContentPage from "./pages/content";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
        {
          path: "/beers",
          element: <ContentPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

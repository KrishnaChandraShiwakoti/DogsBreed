import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Breed from "./pages/Breed";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <h1>Something went wrong!</h1>,
      children: [
        {
          index: true,
          element: <Breed />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

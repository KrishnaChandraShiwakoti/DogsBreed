import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Breed from "./pages/Breed";
import Search from "./pages/Search";
import Add from "./pages/Add";

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
        {
          path: "/add",
          element: <Add />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

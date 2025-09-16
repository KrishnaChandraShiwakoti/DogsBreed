import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Breed from "./pages/Breed";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import { Provider } from "react-redux"
import { store } from "./redux/store"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { MoviePage, IndexPage } from "./pages"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/movie/:id" element={<MoviePage/>}/>
    </Route>
  )
)

function App() {
  return(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>   
  )
}

export default App

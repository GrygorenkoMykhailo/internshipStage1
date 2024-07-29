import { Provider } from "react-redux"
import { IndexPage } from "./Pages/Index"
import { store } from "./redux/store"

function App() {
  return(
    <Provider store={store}>
      <IndexPage/>
    </Provider>   
  )
}

export default App

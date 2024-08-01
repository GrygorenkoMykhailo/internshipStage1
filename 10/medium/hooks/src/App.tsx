import NoteProvider from "./context/NoteContext"
import { IndexPage } from "./pages/Index"

function App() {
  return(
    <NoteProvider>
      <IndexPage/>
    </NoteProvider>
  )
}

export default App

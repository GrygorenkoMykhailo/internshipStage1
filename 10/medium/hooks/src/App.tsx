import NoteProvider from "./context/NoteContext"
import { IndexPage } from "./Pages/Index"

function App() {
  return(
    <NoteProvider>
      <IndexPage/>
    </NoteProvider>
  )
}

export default App

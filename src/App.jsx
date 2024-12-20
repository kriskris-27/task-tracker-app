import "./App.css"
import "./index.css"
import Navbar from "./Navbar"
import Tasks from "./Tasks"

function App() {

  return (
    <>
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
            <Navbar />
            <Tasks />
        </div>
    </>
  )
}

export default App

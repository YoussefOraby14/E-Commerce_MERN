import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import Navbar from "./components/NavBar.tsx"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route  path="/" element = {<HomePage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

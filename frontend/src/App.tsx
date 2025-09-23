import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/NavBar.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import AuthProvider from "./context/Auth/AuthProvider.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import CartPage from "./pages/CartPage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import CartProvider from "./context/Cart/CartProvider.tsx"

function App() {

  return (
    <AuthProvider>
      <CartProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route  path="/" element = {<HomePage />} />
          <Route  path="/register" element = {<RegisterPage />} />
        
          <Route  path="/login" element = {<LoginPage />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
                {/* <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} /> */}
            </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>

  )
}

export default App

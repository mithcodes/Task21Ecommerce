import NavbarList from "./components/NavbarList";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { Suspense, lazy, useState } from "react";
import Context from "./context/Context";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthCxt from "./context/AuthContext";
import Logout from "./components/Logout";

const LazyProduct = lazy(() => import("./pages/Product"));
const LazyAbout = lazy(() => import("./pages/About"));
const LazyContact = lazy(() => import("./pages/Contact"));
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyStore = lazy(() => import("./pages/Store"));

function App() {
  const [showCart, setShowCart] = useState(false);
  const { isLoggedIn } = AuthCxt();

  return (
    <Context>
      <div className="App">
        <NavbarList showCart={showCart} setShowCart={setShowCart} />
        <Cart showCart={showCart} setShowCart={setShowCart} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={
              isLoggedIn ? (
                <Suspense>
                  <LazyStore />
                </Suspense>
              ) : (
                <Suspense>
                  <LazyLogin />
                </Suspense>
              )
            }
            exact
          />
          <Route path="/about" element={<Suspense><LazyAbout /></Suspense>} />
          <Route path="/contact" element={<Suspense><LazyContact /></Suspense>} />
          <Route path="/store/:id" element={<Suspense><LazyProduct /></Suspense>} />
          <Route path="/login" element={<Suspense><LazyLogin /></Suspense>} />
          <Route path="/logout" element={<Suspense><Logout /></Suspense>} />
        </Routes>

        <Footer />
      </div>
    </Context>
  );
}

export default App;

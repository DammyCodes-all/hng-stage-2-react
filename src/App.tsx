import "./index.css";
import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
function App() {
  return (
    <main className="min-h-dvh max-w-[1440px]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

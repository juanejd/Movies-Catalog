import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NavbarMenu from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

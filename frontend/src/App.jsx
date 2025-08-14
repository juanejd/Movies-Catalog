import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NavbarMenu from "./components/Navbar";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movie_id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Lists from "./components/Lists";
import "./App.css";

// Layout con Navbar
function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se cargan las páginas */}
      </main>
    </>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          {/* "/" → Inicio */}
        <Route index element={<Home />} />
        {/* Home */}
        <Route path="/home" element={<Home />} /> 
        {/* Listas */}
        <Route path="/lists" element={<Lists />} />
       {/* Perfil */} 
       {/*<Route path="/perfil" element={<Profile />} /> */ } 
       </Route>
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Lists from "./components/Lists";

function App() {
  return (
    <Router>
      <Routes>
         {/* Redirige la ruta raíz a Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />
        {/* Home */}
        <Route path="/home" element={<Home />} />
         {/* Lists */}
        <Route path="/lists" element={<Lists />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

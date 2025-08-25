import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Lists from "./components/Lists";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />
        {/* Home */}
        <Route path="/home" element={<Home />} />
         {/* Lists */}
        <Route path="/lists" element={<Lists />} />


      </Routes>
    </Router>
  );
}

export default App;

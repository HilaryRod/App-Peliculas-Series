import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Home */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

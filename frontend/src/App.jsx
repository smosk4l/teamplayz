import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import RegisterForm from "./components/Register/RegisterForm";
import Login from "./components/Login/LoginForm";
import MettingList from "./components/Meeting/MettingList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<MettingList />} />
      </Routes>
    </Router>
  );
}

export default App;

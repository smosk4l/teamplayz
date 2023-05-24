import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import RegisterForm from "./components/Register/RegisterForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;

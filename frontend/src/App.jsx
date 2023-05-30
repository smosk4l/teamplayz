import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import RegisterForm from "./components/Register/RegisterForm";
import Login from "./components/Login/LoginForm";
import MeetingList from "./components/Meeting/MeetingList";
import MeetingForm from "./components/Meeting/MeetingForm";
import MeetingDetails from "./components/Meeting/MeetingDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<MeetingList />} />
        <Route path="/meetings/create" element={<MeetingForm />} />
        <Route path="/meetings/details" element={<MeetingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./state/authState";

import Header from "./components/Header/Header";
import RegisterForm from "./components/Register/RegisterForm";
import Login from "./components/Login/LoginForm";
import MeetingList from "./components/Meeting/MeetingList";
import MeetingForm from "./components/Meeting/MeetingForm";
function App() {
  const { user } = useAuthStore();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<MeetingList />} />

        <Route
          path="/meetings/create"
          element={user ? <MeetingForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import useAuthStore from "./state/authState";

import Header from "./components/Header/Header";
import RegisterForm from "./components/Register/RegisterForm";
import Login from "./components/Login/LoginForm";
import MeetingList from "./components/Meeting/MeetingList";
import MeetingForm from "./components/Meeting/MeetingForm";
import MeetingDetails from "./components/Meeting/MeetingDetails";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthStore();
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<MeetingList />} />

        <Route
          path="/meetings/create"
          element={user ? <MeetingForm /> : <Navigate to="/login" />}
        />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

import useAuthStore from './state/authState'
import Header from './components/Header/Header'
import RegisterForm from './components/Register/RegisterForm'
import LoginForm from './components/Login/LoginForm'
import MeetingList from './components/Meeting/MeetingList'
import MeetingForm from './components/Meeting/MeetingForm'
import MeetingDetails from './components/Meeting/MeetingDetails'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserMeetings from './components/Meeting/UserMeetings'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { user } = useAuthStore()
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/signin" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/meetings" element={<MeetingList />} />

          <Route
            path="/meetings/create"
            element={user ? <MeetingForm /> : <Navigate to="/login" />}
          />
          <Route path="/meetings/:id" element={<MeetingDetails />} />

          <Route
            path="/userMeetings/"
            element={user ? <UserMeetings /> : <LoginForm />}
          />
        </Routes>
      </HashRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../../state/authState";

function Login() {
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === "") {
      alert("Proszę wprowadzić adres e-mail.");
      return;
    }

    if (password.trim() === "") {
      alert("Proszę wprowadzić hasło.");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      setUser(data);
      // Todo succes popup model

      alert("Logowanie działa");
      navigate("/");
      return;
    } catch (error) {
      console.error(error);
      alert("Logowanie nie działa.");
    }
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-6">
        <div className="max-w-[500px] w-full">
          <h1 className="text-black-link text-2xl text-center font-bold mb-2">
            Log in to your account
          </h1>
          <div className="w-full px-12">
            <div className="flex flex-col mt-4 gap-2">
              <label htmlFor="email" className="text-sm ">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <label className="text-xs ">
              I have forgotten my password{" "}
              <span className="text-blue-500 underline">Reset</span>
            </label>

            <input
              type="submit"
              value="Login"
              className={
                "text-xl font-bold text-white rounded-lg bg-blue-500 mt-6 w-full py-3"
              }
            />
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to={"/signin"} className="text-blue-500 underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;

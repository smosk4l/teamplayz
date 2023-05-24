import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Walidacja pól
    if (firstName.trim() === "") {
      alert("Proszę wprowadzić imię.");
      return;
    }

    if (lastName.trim() === "") {
      alert("Proszę wprowadzić nazwisko.");
      return;
    }

    if (email.trim() === "") {
      alert("Proszę wprowadzić adres e-mail.");
      return;
    }

    if (password.trim() === "") {
      alert("Proszę wprowadzić hasło.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Potwierdzenie hasła nie pasuje do hasła.");
      return;
    }

    if (!isTermsAccepted) {
      alert("Proszę zaakceptować regulamin.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/users/", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsAccepted,
      });

      alert("Rejestracja udana. Możesz teraz się zalogować.");
    } catch (error) {
      console.error(error);
      alert("Rejestracja nie powiodła się. Spróbuj ponownie.");
    }
  };

  const handleTermsAcceptedChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center my-6"
      >
        <div className="max-w-[500px] w-full">
          <h1 className="text-black-link text-2xl text-center font-bold mb-2">
            Create an Account
          </h1>
          <h2 className="text-link text-sm text-center font-medium">
            Sign up now to get started with an account.
          </h2>
          <div className="w-full px-12">
            <div className="flex flex-col mt-4 gap-2">
              <label htmlFor="firstName" className="text-sm ">
                First name
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <label htmlFor="firstName" className="text-sm ">
                Last name
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
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
            <div className="flex flex-col mt-4 gap-2">
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
            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <label className="text-xs ">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={handleTermsAcceptedChange}
                className="mr-3 "
              />
              I have read and agree to the
              <span className="text-blue-500 underline"> Terms of Service</span>
            </label>
            <input
              type="submit"
              value="Get Started"
              className={
                "text-xl font-bold text-white rounded-lg bg-blue-500 mt-6 w-full py-3"
              }
            />
            <p className="text-center mt-4">
              Have an account?{" "}
              <Link to={"/login"} className="text-blue-500 underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;

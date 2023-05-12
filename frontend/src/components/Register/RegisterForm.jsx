import Navbar from "../Navbar/Navbar";
import Button from "../UI/Button/Button";
import { useState } from "react";
function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTermsAcceptedChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-6">
        <div className="max-w-[500px]">
          <h1 className="text-black-link text-2xl text-center font-bold mb-2">
            Create an Account
          </h1>
          <h2 className="text-link text-sm text-center font-medium">
            Sign up now to get started with an account.
          </h2>
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
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <label className="text-xs ">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsAcceptedChange}
                className="mr-3 "
              />
              I have read and agree to the
              <span className="text-blue-500 underline"> Terms of Service</span>
            </label>

            <Button type={"submit"} className={"bg-blue-500 mt-6 w-full py-3"}>
              Get Started
            </Button>

            <p className="text-center mt-4">
              Have an account? <span className="text-blue-500">Log in</span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;

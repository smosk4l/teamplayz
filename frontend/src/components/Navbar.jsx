import { useContext, useState } from "react";
import logo from "../assets/Teamplayz_logo.png";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-20 overflow-hidden">
      <ul className="flex items-center gap-5 list-none px-4 py-4">
        <li className="mr-auto">
          <img src={logo} alt="Teamplayz logo" />
        </li>
        <li>
          <button className="bg-black-button font-bold text-white px-5 py-2 rounded-lg">
            Sign In
          </button>
        </li>
        <li>
          <button className="text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt4 />}
          </button>
        </li>
      </ul>

      <ul
        className={`flex items-start flex-col gap-10 ml-12 mt-24 easy-out duration-300 text-link [&>*]:hover:text-black

          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <li>
          <a href="#">Features</a>
        </li>
        <li>Features</li>
        <li>Features</li>
        <li>Features</li>
      </ul>
    </nav>
  );
};

export default Navbar;

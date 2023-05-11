import { useContext, useState } from "react";
import logo from "../../assets/teamplayz.jpg";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-20 overflow-hidden bg-white">
      <ul className="flex items-center gap-5 list-none px-4 py-4 md:px-12 md:py-6">
        <li className="mr-auto">
          <img src={logo} alt="Teamplayz logo" className="md:scale-[200%]" />
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
        className={`flex items-start flex-col w-full h-full  gap-10 pl-12 pt-24 easy-out duration-300 text-link overflow-hidden fixed bg-white

          ${
            isMenuOpen
              ? "translate-x-0 sm:translate-x-[60%] lg:translate-x-[70%] xl:translate-x-[80%]"
              : "translate-x-full sm:translate-x-[100%]"
          }
          `}
      >
        <li className="hover:text-black ">
          <a href="#">My account</a>
        </li>
        <li className="hover:text-black ">
          <a href="#">Meetings</a>
        </li>{" "}
        <li className="hover:text-black ">
          <a href="#">About us</a>
        </li>
        <li className="hover:text-black ">
          <a href="#">FAQ</a>
        </li>
        <li className="hover:text-black ">
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
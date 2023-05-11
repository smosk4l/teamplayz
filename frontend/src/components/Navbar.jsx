import logo from "../assets/Teamplayz_logo.png";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center gap-5 list-none px-4 py-4">
        <li className="mr-auto">
          <img src={logo} alt="Teamplayz logo" />
        </li>
        <li>
          <button className="bg-[#303030] font-bold text-white px-5 py-2 rounded-lg">
            Sign In
          </button>
        </li>
        <li>
          <HiOutlineMenuAlt4 className="text-2xl" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import logo from "../../assets/Teamplayz_logo.png";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-5 list-none px-4 py-2">
        <li className="mr-auto">
          <img src={logo} alt="Teamplayz logo" />
        </li>
        <li>
          <button>Sign In</button>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;

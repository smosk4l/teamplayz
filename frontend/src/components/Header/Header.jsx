import Navbar from "../Navbar/Navbar";
import headerIlustration from "../../assets/header_ilustration.png";
function Header() {
  return (
    <header>
      <Navbar />
      <main className="flex flex-col items-center px-8 my-8 md:my-24 ">
        <div className=" mb-5 col-start-1 col-end-3">
          <h1 className="text-black-link text-3xl font-black mb-2">
            Simplify your meeting with TeamPlayz
          </h1>
          <h2 className="text-link text-xl font-medium">
            Make meeting planning a breeze with TeamPlayz
          </h2>
        </div>
        <img
          src={headerIlustration}
          alt="Header Ilustration, A group of friends waving"
        />
        <button
          className="grid
        bg-blue-500 text-xl font-bold text-white mt-3 px-24 py-3 rounded-lg"
        >
          Add meeting
        </button>
      </main>
    </header>
  );
}

export default Header;

import Navbar from "../Navbar/Navbar";
import headerIlustration from "../../assets/header_ilustration.png";
function Header() {
  return (
    <header>
      <Navbar />
      <main className="flex flex-col   px-8 my-8 sm:px-12 md:my-24 md:px-24 lx:flex-row lx:justify-between gap-12 ">
        <div className="mb-5 min-w-[310px]">
          <h1 className="text-black-link text-3xl font-black mb-2">
            Simplify your meeting with TeamPlayz
          </h1>
          <h2 className="text-link text-xl font-medium">
            Make meeting planning a breeze with TeamPlayz
          </h2>
          <button
            className="
        bg-blue-500 text-xl font-bold text-white mt-6 px-24 py-3 rounded-lg hidden lx:inline-block"
          >
            Add meeting
          </button>
        </div>
        <img
          src={headerIlustration}
          alt="Header Ilustration, A group of friends waving"
          className="max-w-[500px] mx-auto lx:m-0"
        />
        <button
          className="
        bg-blue-500 text-xl font-bold text-white mt-3 px-24 py-3 rounded-lg lx:hidden"
        >
          Add meeting
        </button>
      </main>
    </header>
  );
}

export default Header;

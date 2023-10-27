import Navbar from '../Navbar/Navbar'
import headerIllustration from '../../assets/header_ilustration.png'
import Button from '../UI/Button/Button'

function Header() {
  return (
    <header>
      <Navbar />
      <main className="flex flex-col items-center justify-center  px-8 my-8 gap-12 sm:px-12 md:my-24 md:px-24 lx:flex-row lx:justify-between lx:items-start">
        <div className="min-w-[310px]">
          <h1 className="text-black-link text-3xl font-black mb-2">
            Simplify your meeting with TeamPlayz
          </h1>
          <h2 className="text-link text-xl font-medium">
            Make meeting planning a breeze with TeamPlayz
          </h2>
          <Button
            url={'/meetings/create'}
            className={
              'bg-blue-500 mt-6 px-24 py-3 hidden text-white lx:inline-block'
            }
          >
            Add meeting
          </Button>
        </div>
        <img
          src={headerIllustration}
          alt="Header Ilustration, A group of friends waving"
          className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lx:m-0"
        />
        <Button
          url={'/meetings/create'}
          className={'bg-blue-500 px-24 py-3 lx:hidden'}
        >
          Add meeting
        </Button>
      </main>
    </header>
  )
}

export default Header

import Navbar from "../Navbar/Navbar";
import Button from "../UI/Button/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineIosShare } from "react-icons/md";
function MeetingDetails() {
  return (
    <>
      <Navbar />
      <div className="w-full ">
        <main className="flex flex-col gap-2 px-8 mx-auto mt-12 font-poppins max-w-[600px]">
          <h1 className="text-2xl font-bold">Title</h1>
          <span className="text-sm text-gray-500 tracking-wide ">Location</span>
          <span className="font-normal">Description</span>
          <p className="mb-4 text-sm w-[40ch] text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            aspernatur?
          </p>
          <div className="flex flex-col gap-2 px-8 py-4 border">
            <div className="flex gap-4">
              <span>Available slots</span>
              <span>1</span>
            </div>
            <span>Basketball</span>
            <div className="flex flex-col gap-4">
              <Button className={"w-full bg-green-600 text-white  py-2"}>
                Join to meeting
              </Button>
              <div className="flex gap-2 w-full">
                <Button className={"border border-green-600 px-6 py-1"}>
                  <div className="flex gap-2 justify-center items-center text-green-600">
                    <TbArrowBackUp className="text-xl" />
                    <span>Return</span>
                  </div>
                </Button>
                <Button className={"border border-green-600 px-6 py-1"}>
                  <div className="flex gap-2 justify-center items-center text-green-600">
                    <MdOutlineIosShare className="text-xl" />
                    <span>Share</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MeetingDetails;

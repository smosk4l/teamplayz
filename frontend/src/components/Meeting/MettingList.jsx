import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";

function MettingList(props) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1440px]  mt-4 mx-6 xl:mx-auto">
        <div className="px-6 py-4 bg-white my-2 rounded-xl relative">
          <ul>
            <li>
              <h1 className="text-xl">{props.title}</h1>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <IoLocationOutline />
              <span>{props.location}</span>
            </li>
            <li className="text-gray-400 text-sm my-2">{props.description}</li>
            <li className="flex gap-2">
              <div className="flex justify-between w-full">
                <div className="bg-blue-300 text-blue-800 px-4 rounded-lg">
                  {props.tag}
                </div>
                <p className="font-semibold">
                  {props.players}/{props.maxPlayers}
                </p>
              </div>
            </li>
          </ul>
          <div className="absolute right-4 top-4 rounded-full bg-gray-100 p-1">
            <IoHeartOutline className="text-xl stroke-slate-500" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MettingList;

import { Link } from 'react-router-dom'
import { IoLocationOutline, IoHeartOutline, IoClose } from 'react-icons/io5'
import { MdLocationPin } from 'react-icons/md'
import { BiEdit, BiX } from 'react-icons/bi'

interface MeetingItemProps {
  link: string
  title: string
  location: string
  description: string
  tag: string
  players: number
  maxPlayers: number
  turnLikeIcon: boolean
}

function MeetingItem({
  link,
  title,
  location,
  description,
  tag,
  players,
  maxPlayers,
  turnLikeIcon,
}: MeetingItemProps) {
  return (
    <div className="mx-6  mt-4 max-w-[1200px] xl:mx-auto">
      <Link to={link}>
        <div className="relative my-2 rounded-xl border bg-white px-6 py-4 shadow-sm">
          <ul>
            <li>
              <h1 className="text-xl">{title}</h1>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <IoLocationOutline />
              <span>{location}</span>
            </li>
            <li className="my-2 text-sm text-gray-400">{description}</li>
            <li className="flex gap-2">
              <div className="flex w-full justify-between">
                <div className="rounded-lg bg-blue-300 px-4 text-blue-800">
                  {tag}
                </div>
                <p className="font-semibold">
                  {players}/{maxPlayers}
                </p>
              </div>
            </li>
          </ul>
          {turnLikeIcon && (
            <div className="absolute right-4 top-4 rounded-full bg-gray-100 p-1">
              <IoHeartOutline className="stroke-slate-500 text-xl" />
            </div>
          )}
        </div>
      </Link>
    </div>
    // <div className="mx-12 my-2 flex  max-w-[700px] items-center gap-8 overflow-hidden rounded-xl bg-white">
    //   <div className="flex flex-col gap-1 border-l-8 border-blue-500 py-4 pl-6">
    //     <span className="text-lg font-bold">3:30 PM</span>
    //     <span className="text-gray-400">30 minutes</span>
    //   </div>

    //   <div className="flex items-center gap-6 border-l-2 border-gray-200">
    //     <div className="ml-5 h-11 w-11 rounded-full bg-red-600"></div>
    //     <div className="flex flex-col gap-1">
    //       <span className=" text-lg font-bold">Meghan Smith</span>
    //       <p className="flex items-center">
    //         <MdLocationPin />
    //         <span>Intrepid Cafe</span>
    //       </p>
    //     </div>
    //     <div className="ml-10 flex flex-col gap-1">
    //       <span className="text-lg font-bold">September 10th</span>
    //       <p className="flex items-center gap-2">
    //         <div className="h-4 w-4 rounded-full bg-blue-500"></div>
    //         <span className="text-blue-500">Confirmed</span>
    //       </p>
    //     </div>
    //   </div>
    //   <div className="ml-16 flex items-center gap-5">
    //     <BiEdit />
    //     <BiX />
    //   </div>
    // </div>
  )
}

export default MeetingItem

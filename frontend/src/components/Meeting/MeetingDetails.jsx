import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import Navbar from "../Navbar/Navbar";
import Button from "../UI/Button/Button";

import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineIosShare } from "react-icons/md";

function MeetingDetails() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/meetings/" + id
      );

      if (!data) return;

      return setMeeting(data.meeting);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      {meeting && (
        <div className="w-full">
          <main className="flex flex-col gap-2 px-8 mx-auto mt-12 font-poppins max-w-[600px]">
            <h1 className="text-2xl font-bold">{meeting.title}</h1>
            <span className="text-sm text-gray-500 tracking-wide ">
              {meeting.location}
            </span>
            <span className="font-normal">Description</span>
            <p className="mb-4 text-sm w-[40ch] text-gray-700">
              {meeting.description}
            </p>
            <div className="flex flex-col gap-2 px-8 py-4 border">
              <div className="flex gap-4">
                <span>Available slots</span>
                <span>{meeting.attendeesSlots - meeting.attendees.length}</span>
              </div>
              <span>{meeting.tag}</span>
              <div className="flex flex-col gap-4">
                <Button className={"w-full bg-green-600 text-white  py-2"}>
                  Join to meeting
                </Button>
                <div className="flex gap-2 w-full">
                  <Link to={"/meetings"}>
                    <Button className={"border border-green-600 px-6 py-1"}>
                      <div className="flex gap-2 justify-center items-center text-green-600">
                        <TbArrowBackUp className="text-xl" />
                        <span>Return</span>
                      </div>
                    </Button>
                  </Link>
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
      )}
    </>
  );
}

export default MeetingDetails;

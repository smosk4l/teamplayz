import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthState from "../../state/authState";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineIosShare } from "react-icons/md";
import PopupModal from "../Modal/PopupModal";

function MeetingDetails() {
  const { user } = useAuthState();
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/meetings/" + id
      );

      if (!data) return;

      setMeeting(data.meeting);
    };

    fetchData().catch(console.error);
  }, []);

  const addUserToMeeting = async () => {
    if (!user) navigate("/login");

    const res = await axios.post(
      `http://localhost:8000/api/meetings/${id}/addUser`,
      {
        userId: user.id,
      }
    );

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      {meeting && (
        <div className="w-full">
          <main className="flex flex-col gap-2 px-8 py-8 mx-auto mt-12 font-poppins max-w-[600px] shadow-md rounded-lg">
            <h1 className="text-2xl font-bold">{meeting.title}</h1>
            <span className="text-sm text-gray-500 tracking-wide ">
              {meeting.location}
            </span>
            <span className="font-normal">Description</span>
            <p className="mb-4 text-sm w-[40ch] text-gray-700">
              {meeting.description}
            </p>
            <div className="flex flex-col gap-2 px-8 py-4 ">
              <div className="flex gap-4">
                <span>Available slots</span>
                <span>{meeting.attendeesSlots - meeting.attendees.length}</span>
              </div>
              <span>{meeting.tag}</span>
              <div className="flex flex-col gap-4">
                <button
                  onClick={addUserToMeeting}
                  className={"w-full bg-green-600 text-white  py-2"}
                >
                  Join to meeting
                </button>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => navigate("/meetings")}
                    className={
                      "border border-green-600 px-6 py-1 w-full rounded-lg"
                    }
                  >
                    <div className="flex gap-2 justify-center items-center text-green-600 ">
                      <TbArrowBackUp className="text-xl" />
                      <span>Return</span>
                    </div>
                  </button>
                  <button
                    className={
                      "border border-green-600 px-6 py-1 w-full rounded-lg"
                    }
                  >
                    <div className="flex gap-2 justify-center items-center text-green-600">
                      <MdOutlineIosShare className="text-xl" />
                      <span>Share</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {showModal && (
        <PopupModal
          message="Congratulations, you have joined the meeting!"
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default MeetingDetails;

import React, { useEffect, useState } from "react";
import useAuthState from "../../../state/authState";
import axios from "axios";

function ToggleButton({ onMeetingsChange }) {
  const [meetings, setMeetings] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useAuthState();
  const [url, setUrl] = useState("userMeetings/" + user.id);

  const changeUrlHandler = () => {
    isChecked
      ? setUrl("userMeetings/" + user.id)
      : setUrl("byOwner/" + user.id);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/meetings/" + url
      );
      onMeetingsChange(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="flex justify-center my-8">
      <label
        htmlFor="Toggle Button"
        className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800 ease-linear duration-300"
        onChange={() => {
          setIsChecked(!isChecked);
          changeUrlHandler();
        }}
      >
        <input id="Toggle Button" type="checkbox" className="hidden peer" />
        <span className="px-4 py-2 rounded-l-md dark:bg-violet-400 peer-checked:dark:bg-gray-300 transition-colors duration-300 ease-in">
          Attending
        </span>
        <span className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-violet-400 transition-colors duration-300 ease-in">
          Organizing
        </span>
      </label>
    </div>
  );
}

export default ToggleButton;

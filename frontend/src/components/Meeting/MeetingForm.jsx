import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState } from "react";

import React from "react";

function MeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [maxSlots, setMaxSlots] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === "") {
      alert("Proszę wprowadzić adres e-mail.");
      return;
    }

    if (description.trim() === "") {
      alert("Proszę wprowadzić hasło.");
      return;
    }

    if (location.trim() === "") {
      alert("Proszę wprowadzić hasło.");
      return;
    }

    if (tag.trim() === "") {
      alert("Proszę wprowadzić hasło.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/meetings/createMeeting", {
        title,
        description,
        time: date,
        location,
        tag,
        attendeesSlots: maxSlots,
      });
      alert("Dodano do bazy");
    } catch (error) {
      console.error(error);
      alert("Nie udało dodać się do bazy");
    }
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-6">
        <div className="max-w-[500px] w-full">
          <h1 className="text-black-link text-2xl text-center font-bold mb-2">
            Create a new meeting
          </h1>
          <div className="w-full px-12">
            <div className="flex flex-col mt-4 gap-2">
              <label htmlFor="title" className="text-sm ">
                Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                min={Date.now()}
                max={"2024-01-01"}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col my-4 gap-2">
              <label htmlFor="maxSlots">Available slots</label>
              <input
                type="number"
                min={1}
                id="maxSlots"
                name="maxSlots"
                value={maxSlots}
                onChange={(e) => setMaxSlots(e.target.value)}
                required
                className="w-full border-gray-300 px-3 py-2 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <input
              type="submit"
              value="Create meeting"
              className={
                "text-xl font-bold text-white rounded-lg bg-blue-500 mt-6 w-full py-3"
              }
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default MeetingForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import MeetingItem from "./MeetingItem";
import Navbar from "../Navbar/Navbar";
function MeetingList() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/meetings/public"
        );
        const data = response.data;
        console.log(data);
        setMeetings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {meetings.map((meeting) => (
        <MeetingItem
          key={crypto.randomUUID()}
          title={meeting.title}
          location={meeting.location}
          description={meeting.description}
          players={meeting.attendees.length}
          maxPlayers={meeting.attendeesCount}
        />
      ))}
    </>
  );
}

export default MeetingList;

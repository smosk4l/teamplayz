import { useEffect, useState } from "react";
import useAuthState from "../../state/authState";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import MeetingItem from "./MeetingItem";
import ToggleButton from "../UI/Button/ToggleButton";
function UserMeetings() {
  const { user } = useAuthState();
  const [meetings, setMeetings] = useState(null);
  const [isOrganizingMode, setIsOrganizingMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/meetings/userMeetings/" + user.id
      );

      if (!data) return;

      setMeetings(data);
      return;
    };

    fetchData().catch(console.error);
  }, []);

  const handleMeetingsChange = (newMeetings) => {
    setMeetings(newMeetings);
    setIsOrganizingMode(!isOrganizingMode);
  };

  return (
    <>
      <Navbar />
      <ToggleButton onMeetingsChange={handleMeetingsChange} />

      {meetings?.map((meeting) => (
        <MeetingItem
          link={"/meetings/" + meeting._id}
          id={meeting._id}
          key={crypto.randomUUID()}
          title={meeting.title}
          tag={meeting.tag}
          location={meeting.location}
          description={meeting.description}
          players={meeting.attendees.length}
          maxPlayers={meeting.attendeesSlots}
        />
      ))}
    </>
  );
}

export default UserMeetings;

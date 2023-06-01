import { useEffect, useState } from "react";
import useAuthState from "../../state/authState";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
function UserMeetings() {
  const { user } = useAuthState();
  const [meetings, setMeetings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/userMeetings/" + user.id
      );

      if (!data) return;

      return setMeetings(data.meeting);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      {meetings?.map((meeting) => (
        <MeetingItem
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MeetingItem from './MeetingItem';
import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';

function MeetingList() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get('http://localhost:8000/api/meetings/public')
        .then((response) => {
          const data = response.data;
          setMeetings(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {/* List of meetings */}
      <div className="absolute left-0 top-0 flex h-full w-screen flex-row-reverse gap-6">
        <Map />
        <div className="h-screen w-2/5 overflow-auto">
          {meetings.map((meeting) => (
            <MeetingItem
              link={'/meetings/' + meeting._id}
              id={meeting._id}
              key={crypto.randomUUID()}
              title={meeting.title}
              tag={meeting.tag}
              location={meeting.location}
              description={meeting.description}
              players={meeting.attendees.length}
              maxPlayers={meeting.attendeesSlots}
              turnLikeIcon={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MeetingList;

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

  const exampleMarkers = [
    { lat: 50.049683, lng: 19.944544 },
    { lat: 50.059683, lng: 19.954544 },
    { lat: 50.069683, lng: 19.964544 },
  ];

  return (
    <>
      <Navbar />
      <div className="absolute left-0 top-0 translate-y-20 flex  w-screen lxx:flex-row-reverse gap-6 flex-col h-[90%]">
        <Map showSearch={false} markers={exampleMarkers} />
        <div className="h-full w-full xl:w-2/5 overflow-auto">
          {meetings.map((meeting) => (
            <MeetingItem
              link={'/meetings/' + meeting._id}
              id={meeting._id}
              key={meeting._id}
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

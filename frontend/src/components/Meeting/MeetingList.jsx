import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MeetingItem from './MeetingItem';
import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';
import Pagination from '@mui/material/Pagination';
import { MAX_MEETINGS_NUMBER_PER_PAGE } from '../../utils/constants';

function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [page, setPage] = useState(1);
  const allMeetingsAmount = useRef(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getAllMarkers = async () => {
      const response = await axios
        .get('http://localhost:8000/api/meetings/marker/points')
        .then((response) => {
          const { data } = response;
          setMarkers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getAllMarkers();
  }, []); // Empty dependencies array, this effect will run only once after the component mounts

  useEffect(() => {
    const getAllPublicMeetings = async () => {
      const response = await axios
        .post('http://localhost:8000/api/meetings/public', {
          page: page,
          limit: MAX_MEETINGS_NUMBER_PER_PAGE,
        })
        .then((response) => {
          const data = response.data;
          const { meetings, totalMeetings } = data;
          setMeetings(meetings);
          allMeetingsAmount.current = totalMeetings;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getAllPublicMeetings();

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [page]); // Dependencies array with 'page', this effect will run every time 'page' changes

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Navbar />
      <div className="absolute left-0 top-0 translate-y-20 flex  w-screen lxx:flex-row-reverse gap-6 flex-col h-[90%]">
        <Map showSearch markers={markers} />
        <div className="h-full w-full xl:w-2/5 overflow-auto" ref={scrollRef}>
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
          <div className="flex justify-center">
            <Pagination
              count={Math.ceil(allMeetingsAmount.current / 10)}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetingList;

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MeetingItem from './MeetingItem'
import Navbar from '../Navbar/Navbar'

function MeetingList() {
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/meetings/public'
        )
        const data = response.data
        setMeetings(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      {/* List of meetings */}
      <div className="w-screen">
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
    </>
  )
}

export default MeetingList

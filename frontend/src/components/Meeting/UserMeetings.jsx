import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthState from '../../state/authState'
import axios from 'axios'

import Navbar from '../Navbar/Navbar'
import MeetingItem from './MeetingItem'
import ToggleButton from '../UI/Button/ToggleButton'
import OrganizingMode from '../UI/Mode/OrganizingMode'
function UserMeetings() {
  const { user } = useAuthState()
  const [meetings, setMeetings] = useState(null)
  const [isOrganizingMode, setIsOrganizingMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'http://localhost:8000/api/meetings/userMeetings/' + user.id
      )

      if (!data) return

      return setMeetings(data)
    }

    fetchData().catch(console.error)
  }, [])

  const handleMeetingsChange = (newMeetings) => {
    setMeetings(newMeetings)
  }

  const handleOrganizingMode = () => {
    setIsOrganizingMode(!isOrganizingMode)
  }

  return (
    <>
      <Navbar />
      <ToggleButton
        onMeetingsChange={handleMeetingsChange}
        onOrganizingMode={handleOrganizingMode}
      />

      {!meetings && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-3xl">
            You do not attend or organize any meeting
          </h1>

          <Link
            to={'/meetings'}
            className="mt-6 rounded-lg bg-blue-500 px-5  py-2 text-white"
          >
            View meetings
          </Link>
        </div>
      )}
      {meetings?.map((meeting) => (
        <div key={crypto.randomUUID()} className="relative">
          <MeetingItem
            link={'/meetings/' + meeting._id}
            id={meeting._id}
            title={meeting.title}
            tag={meeting.tag}
            location={meeting.location}
            description={meeting.description}
            players={meeting.attendees.length}
            maxPlayers={meeting.attendeesSlots}
            turnLikeIcon={isOrganizingMode ? true : false}
          />
          <OrganizingMode id={meeting._id} />
        </div>
      ))}
    </>
  )
}

export default UserMeetings

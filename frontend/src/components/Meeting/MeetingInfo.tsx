import React from 'react';

const MeetingInfo = ({ meeting }: { meeting: any }) => (
  <>
    <h1 className="text-2xl font-bold">{meeting.title}</h1>
    <span className="text-sm tracking-wide text-gray-500 ">
      {meeting.location}
    </span>
    <span className="font-normal">Description</span>
    <p className="mb-4 w-[40ch] text-sm text-gray-700">{meeting.description}</p>
    <div className="flex gap-4">
      <span>Available slots</span>
      <span>{meeting.attendeesSlots - meeting.attendees.length}</span>
    </div>
    <span>{meeting.tag}</span>
  </>
);

export default MeetingInfo;

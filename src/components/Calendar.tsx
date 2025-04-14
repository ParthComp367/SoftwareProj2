import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  start: string;
  interviewer: string;
  interviewee: string;
  company: string;
  position: string;
}

interface CalendarProps {
  meetings: Meeting[];
  onEventClick: (meeting: Meeting) => void;
}

export default function Calendar({ meetings, onEventClick }: CalendarProps) {
  const events = meetings.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    start: meeting.start,
    extendedProps: {
      interviewer: meeting.interviewer,
      interviewee: meeting.interviewee,
      company: meeting.company,
      position: meeting.position
    }
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        eventClick={(info) => {
          const meeting = meetings.find(m => m.id === info.event.id);
          if (meeting) {
            onEventClick(meeting);
          }
        }}
        eventContent={(eventInfo) => {
          return (
            <div className="p-1">
              <div className="font-semibold text-sm">{eventInfo.event.title}</div>
              <div className="text-xs">
                {format(eventInfo.event.start!, 'HH:mm')}
              </div>
            </div>
          );
        }}
        height="auto"
      />
    </div>
  );
}
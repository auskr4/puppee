import React, { useState } from "react";
import './EventList.css'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



function EventList({events, onDelete }) {

    //sort Events
    const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
    
    //group them
    const eventsByDate = sortedEvents.reduce((dateGroups, event) => {
        const date = new Date(event.date).toDateString();
        if (!dateGroups[date]) {
            dateGroups[date] = []
        }
        dateGroups[date].push(event);
        return dateGroups;
    }, {});

    const hasEvents = events.length > 0;

    return (
        <div className={hasEvents ? "eventListContainer" : "eventListContainerEmpty"}>
            {Object.keys(eventsByDate).map(date => (
                <div key={date}>
                    <h2>{date}</h2>
                    {eventsByDate[date].map((event, index) => (
                        <p key={index}>
                            {event.type === 'feed' ? <FastfoodIcon /> : <CheckCircleOutlineIcon className="peeCheck"/> } {event.type === 'feed' ? 'fed' : event.type} at {event.time}
                            <button className="deleteButton" onClick={() => onDelete(event.id)}>Delete</button>
                        </p>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default EventList;
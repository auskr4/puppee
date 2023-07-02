import React, { useState } from "react";
import './EventList.css'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



function EventList({events, onDelete }) {

    //sort Events
    const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
    
    //group them
    const eventsByDate = sortedEvents.reduce((dateGroups, event) => {
        console.log(event.date)
        const date = new Date(event.date).toISOString().split('T')[0];
        console.log("new date: ", date);
        if (!dateGroups[date]) {
            dateGroups[date] = []
        }
        dateGroups[date].push(event);
        return dateGroups;
    }, {});

    const hasEvents = events.length > 0;

    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    };

    return (
        <div className={hasEvents ? "eventListContainer" : "eventListContainerEmpty"}>
            {Object.keys(eventsByDate).map(date => (
                <div key={date}>
                    <h2>{date}</h2>
                    {eventsByDate[date].map((event, index) => (
                        <p key={index}>
                            {event.type === 'feed' ? <FastfoodIcon /> : <CheckCircleOutlineIcon className="peeCheck"/> } {event.type === 'feed' ? 'fed' : event.type} at {formatTime(event.time)}
                            <button className="deleteButton" onClick={() => onDelete(event.id)}>Delete</button>
                        </p>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default EventList;
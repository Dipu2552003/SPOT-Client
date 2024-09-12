import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../HomePage/Sidebar.js";
import { SideFeatured } from "../SideFeatured/Sidefeatured.js";
import EventCard from "./EventCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the styles for the calendar

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage selected date

  useEffect(() => {
    // Sample data for filler events
    const sampleEvents = [
      {
        id: 1,
        title: "Tech Fest 2024",
        imageUrl: "https://via.placeholder.com/150",
        description:
          "Join us for a 3-day tech extravaganza with workshops and talks by industry leaders.",
        postedBy: "John Doe",
        datePosted: "September 10, 2024",
      },
      {
        id: 2,
        title: "AI Conference",
        imageUrl: "https://via.placeholder.com/150",
        description:
          "A full-day conference on the latest advancements in AI and machine learning.",
        postedBy: "Jane Smith",
        datePosted: "September 8, 2024",
      },
      {
        id: 3,
        title: "Cultural Fest",
        imageUrl: "https://via.placeholder.com/150",
        description:
          "An exciting cultural fest filled with music, dance, and drama performances.",
        postedBy: "VIT Pune Admin",
        datePosted: "September 7, 2024",
      },
    ];
    setEvents(sampleEvents);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="maincontent">
        <div className="row">
          <Sidebar />
          <div className="col-sm-9 col-md-10 col-12 bgmoredark cssforpadTomaincontent">
            <div className="row">
              {/* Main content with event cards */}
              <div className="col-lg-8">
                <div className="row margquesions">
                  <div className="col-7 col-xl-9 col-lg-8 col-md-7">
                    <h3 className="allquesionhead">Upcoming Events</h3>
                  </div>
                </div>
                <hr />
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {/* Sidebar with calendar */}
              <div className="col-lg-4">
                <h4>Select Date</h4>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

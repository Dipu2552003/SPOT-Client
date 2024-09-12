import React from "react";

const EventCard = ({ event }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-2 event-image">
          <img src={event.imageUrl} alt={event.title} className="img-fluid" />
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="row">
              <a href="#event" className="header-event text-primary">
                {event.title}
              </a>
              <p>{event.description}</p>
            </div>
            <div className="row">
              <div className="col-8">
                <span>Posted by: {event.postedBy}</span>
              </div>
              <div className="col-4">
                <div className="daysagocss">Posted on {event.datePosted}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default EventCard;

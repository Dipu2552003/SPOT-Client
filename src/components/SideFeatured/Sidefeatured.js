import React from "react";
import "./Sidefeatured.css";

const SideFeatured = (props) => {
  var well = {
    boxShadow: "2px 1px 2px 1px #9E9E9E",
  };

  return (
    <div>
      <div class="list-group" style={well}>
        <div class="list-group-item anchorsideheader flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <small>VIT Pune News</small>
          </div>
        </div>

        <div class="backcontentofheaderside list-group-item flex-column align-items-start">
          <a href="#news">
            <i class="fas fa-bullhorn"></i>
            <small class="text-muted">
              Annual Cultural Fest is Coming Soon!
            </small>
          </a>
          <br />
          <br />
          <a href="#news">
            <i class="fas fa-bullhorn"></i>
            <small class="text-muted">
              New Clubs Launched: Join Robotics Club
            </small>
          </a>
        </div>

        <div class="anchorsideheader list-group-item flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <small>Upcoming Events</small>
          </div>
        </div>

        <div class="backcontentofheaderside list-group-item flex-column align-items-start">
          <a href="#events">
            <i class="fas fa-calendar-alt"></i>
            <small class="text-muted">
              Hackathon: Code Warriors (Sep 20th)
            </small>
          </a>
          <br />
          <br />
          <a href="#events">
            <i class="fas fa-calendar-alt"></i>
            <small class="text-muted">
              Guest Lecture: AI in Space (Sep 25th)
            </small>
          </a>
          <br />
          <br />
          <a href="#events">
            <i class="fas fa-calendar-alt"></i>
            <small class="text-muted">
              Workshop: Blockchain Basics (Oct 2nd)
            </small>
          </a>
          <br />
        </div>

        <div class="anchorsideheader list-group-item flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <small>Club Highlights</small>
          </div>
        </div>

        <div class="backcontentofheaderside list-group-item flex-column align-items-start">
          <a href="#clubs">
            <i class="fas fa-users"></i>
            <small class="text-muted">Music Club: Open Mic Night Recap</small>
          </a>
          <br />
          <br />
          <a href="#clubs">
            <i class="fas fa-users"></i>
            <small class="text-muted">
              Sports Club: Inter-College Football Tournament
            </small>
          </a>
        </div>
      </div>
    </div>
  );
};

export { SideFeatured };

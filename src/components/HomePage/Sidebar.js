import React, { useEffect } from "react";
import "./Homepage.css";

const Sidebar = ({ questioncount, tagscount }) => {
  useEffect(() => {
    const initialElement = document.getElementById("clickleftmenu1");
    if (initialElement) {
      applyActiveStyles(initialElement);
    }
  }, []);

  const applyActiveStyles = (element) => {
    document.querySelectorAll(".clickleftmenu").forEach((el) => {
      el.style.color = "black";
      el.style.border = "none";
      el.style.background = "none";
    });
    element.style.color = "#007bff";
    element.style.borderRight = "5px solid #007bff";
    element.style.background = "";
    element.classList.remove("bg-light");
    element.classList.add("bg-sec");
  };

  const handleClick = (event) => {
    applyActiveStyles(event.currentTarget);
  };

  return (
    <div className="col-sm-3 col-md-2 d-none d-sm-block">
      <div className="just-padding">
        <div className="list-group list-group-flush bg-light bg-gradient">
          <a
            href="/"
            className="list-group-item clickleftmenu bg-light bg-gradient"
            style={{ fontSize: "12px", textDecoration: "none" }}
            id="clickleftmenu3"
            onClick={handleClick}
          >
            Home
          </a>

          <div
            className="list-group-item clickleftmenu bg-light bg-gradient"
            style={{ fontSize: "12px", textDecoration: "none" }}
            id="clickleftmenu2"
            onClick={handleClick}
          >
            PUBLIC
          </div>
          <div
            className="list-group list-group-flush bg-light bg-gradient"
            id="item-3"
          >
            <a
              href="#hello"
              id="clickleftmenu1"
              style={{ textDecoration: "none" }}
              className="clickleftmenu list-group-item bg-light bg-gradient"
              onClick={handleClick}
            >
              <i className="fas fa-globe-africa"></i>Questions
              <span className="badge countbadge badge-primary">
                {questioncount}
              </span>
            </a>

            <a
              href="#item32"
              id="clickleftmenu4"
              style={{ textDecoration: "none" }}
              className="clickleftmenu list-group-item bg-light bg-gradient"
              onClick={handleClick}
            >
              <i className="fas fa-tags"></i>Tags
              <span className="badge countbadge badge-primary">
                {tagscount}
              </span>
            </a>

            <a
              href="#item33"
              id="clickleftmenu5"
              style={{ textDecoration: "none" }}
              className="clickleftmenu list-group-item bg-light bg-gradient"
              onClick={handleClick}
            >
              <i className="fas fa-users"></i>Users
            </a>

            <a
              href="#item33"
              id="clickleftmenu6"
              style={{ textDecoration: "none" }}
              className="clickleftmenu list-group-item bg-light bg-gradient"
              onClick={handleClick}
            >
              <i className="fas fa-briefcase"></i>Jobs
            </a>
          </div>
          <a
            href="/tag/academic"
            className="list-group-item clickleftmenu bg-light bg-gradient"
            style={{ fontSize: "12px", textDecoration: "none" }}
            id="clickleftmenu7"
            onClick={handleClick}
          >
            Teams
          </a>
          <a
            href="/tag/academic"
            className="list-group-item clickleftmenu bg-light bg-gradient"
            style={{ fontSize: "12px", textDecoration: "none" }}
            id="clickleftmenu8"
            onClick={handleClick}
          >
            Teams
          </a>
          <div className="nav-item dropdown">
            <a
              href="#items-navbar"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Products
            </a>
            <div className="dropdown-menu">
              <a href="#items-navbar" className="dropdown-item">
                StackExchange
              </a>
              <a href="#items-navbar" className="dropdown-item">
                Community Forum
              </a>
              <a href="#items-navbar" className="dropdown-item">
                Code Editor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

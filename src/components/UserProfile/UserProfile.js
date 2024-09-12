import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Questions from "./UserQuestions/Questions";
import Answers from "./UserAnswers/Answers";
import "./UserProfile.css";
import { data } from "jquery";

const UserProfile = () => {
  const [cookies] = useCookies(["user"]);
  const [userData, setUserData] = useState({});
  const [loaderforwait, setLoaderForWait] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [countAnswer, setCountAnswer] = useState(0);
  const [visit, visitCount] = useState(0);
  const [activeSection, setActiveSection] = useState("contentName1");

  const navigate = useNavigate();

  // Fetch user data from the API
  const callUserPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jsonwebtoken: cookies.jwttokenloginuser, // Include the token in the headers
        },
        credentials: "include",
        body: JSON.stringify({}),
      });
      const userdata = await res.json();
      if (res.status === 200) {
        const username = userdata.name;
        setUserData({
          name: userdata.name,
          email: userdata.email,
        });

        setLoaderForWait(false);
      } else {
        throw new Error(userdata.error);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const fetchUserQuestions = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/user/getuserquestions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            jsonwebtoken: cookies.jwttokenloginuser,
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );
      const responsedata = await res.json();

      if (Array.isArray(responsedata)) {
        setQuestionCount(responsedata.length);

        // Calculate total views from all questions
        const totalViews = responsedata.reduce((acc, question) => {
          return acc + (question.views || 0); // Add views for each question
        }, 0);

        visitCount(totalViews); // Update visit count state
      }
    } catch (err) {
      console.log("Error fetching user questions:", err);
    }
  };

  const fetchUserAnswers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/getuseranswers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jsonwebtoken: cookies.jwttokenloginuser, // Include the token in the headers
        },
        credentials: "include",
        body: JSON.stringify({}), // You might need to pass relevant data if required by your API
      });

      const responsedata = await res.json();

      if (Array.isArray(responsedata)) {
        setCountAnswer(responsedata.length);
      } else {
        console.log("Unexpected response format:", responsedata);
      }
    } catch (err) {
      console.log("Error fetching user answers:", err);
    }
  };

  useEffect(() => {
    callUserPage();
    fetchUserQuestions();
    fetchUserAnswers();
  }, []);

  const toggleUserMenu = () => {
    setActiveSection((prevSection) =>
      prevSection === "sidebar-active" ? "" : "sidebar-active"
    );
  };

  const openPage = (pageName) => {
    setActiveSection(pageName);
  };

  return (
    <div>
      <div
        className={`sidebar bg-primary ${
          activeSection === "sidebar-active" ? "active" : ""
        }`}
      >
        <div className="logo-details">
          <i className="fab fa-stack-overflow"></i>
          <a href="/home/" className="logo_name">
            SPOT
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a
              href="#"
              className={activeSection === "contentName1" ? "active" : ""}
              onClick={() => openPage("contentName1")}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span className="nav-1 links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeSection === "user_answers" ? "active" : ""}
              onClick={() => openPage("user_answers")}
            >
              <i className="fas fa-user"></i>
              <span className="nav-2 links_name">Your Answers</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeSection === "user_questions" ? "active" : ""}
              onClick={() => openPage("user_questions")}
            >
              <i className="fas fa-question"></i>
              <span className="nav-3 links_name">Your Questions</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={activeSection === "user_teams" ? "active" : ""}
              onClick={() => openPage("user_teams")}
            >
              <i className="fas fa-user-friends"></i>
              <span className="nav-6 links_name">Teams</span>
            </a>
          </li>

          <li>
            <a href="/logout">
              <i className="fas fa-arrow-alt-circle-left"></i>
              <span className="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>

      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="fas fa-bars sidebarBtn" onClick={toggleUserMenu}></i>
            <span className="dashboard">Profile</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="fas fa-search"></i>
          </div>
          <div className="profile-details">
            <img
              src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
              width="30"
              height="30"
              alt="avatar"
              className="rounded-circle"
            />
            <span className="admin_name">{userData.name}</span>
          </div>
        </nav>

        <div
          className={`home-content Right-bar ${
            activeSection === "contentName1" ? "" : "d-none"
          }`}
          id="contentName1"
        >
          {/* Reputation answer and question number */}
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Reputation</div>
                <div className="number">40</div>
                <div className="indicator"></div>
              </div>
              <i className="fas fa-users-cog cart"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Answers</div>
                <div className="number">{countAnswer}</div>
                <div className="indicator"></div>
              </div>
              <i className="fas fa-chalkboard-teacher cart two"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Questions</div>
                <div className="number">{questionCount}</div>
                <div className="indicator"></div>
              </div>
              <i className="fas fa-question cart three"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Visits</div>
                <div className="number">{visit}</div>
                <div className="indicator"></div>
              </div>
              <i className="fas fa-eye cart four"></i>
            </div>
          </div>

          <div className="container">
            <div className="row container">
              <div className="col-10 container">
                {loaderforwait && (
                  <img
                    src="https://user-images.githubusercontent.com/39302742/151104547-d9c7baf0-ec1b-40d0-8011-634d04dc9185.gif"
                    alt="Loader"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`home-content Right-bar ${
            activeSection === "user_answers" ? "" : "d-none"
          }`}
          id="user_answers"
        >
          <div className="container">
            <h3>Your Answers</h3>
            <Answers />
          </div>
        </div>

        <div
          className={`home-content Right-bar ${
            activeSection === "user_questions" ? "" : "d-none"
          }`}
          id="user_questions"
        >
          <div className="container">
            <h3>Your Questions</h3>
            <Questions />
          </div>
        </div>

        <div
          className={`home-content Right-bar ${
            activeSection === "user_settings" ? "" : "d-none"
          }`}
          id="user_settings"
        >
          <div className="container">
            <h3>Settings</h3>
            <div className="row container">
              <div className="col-10 container"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;

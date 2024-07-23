import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Navbar from "../NavBar/Navbar";
import { SideFeatured } from "../SideFeatured/Sidefeatured.js";
import Questions from "../Questions/questions";
import { AskQuestion } from "../AskQuestion/askquestion";
import { useCookies } from "react-cookie";
import Sidebar from "./Sidebar.js";

const Homepage = () => {
  const [cookies, setCookie] = useCookies(["jwttokenloginuser"]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalTags, setTotalTags] = useState(0);

  useEffect(() => {
    // Initialize state from cookies
    const jwtTokenLoginUserCookie = cookies.jwttokenloginuser || "";
    // Additional initialization logic if needed
  }, [cookies.jwttokenloginuser]);

  const handleCountChange = (data, tagscount) => {
    setTotalQuestion(data);
    setTotalTags(tagscount);
    console.log(data, tagscount);
  };

  let askquestionsign;
  if (cookies.jwttokenloginuser) {
    askquestionsign = (
      <div>
        <button
          className="btnaskquestion btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#askquestionmodal"
        >
          Ask Question
        </button>
        <AskQuestion />
      </div>
    );
  } else {
    askquestionsign = (
      <button
        className="btnaskquestion btn btn-secondary"
        data-toggle="modal"
        data-target="#loginModal"
      >
        Login To Ask Question
      </button>
    );
  }

  return (
    <div>
      <Navbar />
      {/* Grid System for questions */}
      <div className="maincontent">
        <div className="row">
          {/*first grid*/}
          <Sidebar questioncount={totalQuestion} tagscount={totalTags} />
          {/*second grid*/}
          <div className="col-sm-9 col-md-10 col-12 bgmoredark cssforpadTomaincontent">
            <div className="row">
              <div className="col-lg-8">
                <div className="row margquesions">
                  <div className="col-7 col-xl-9 col-lg-8 col-md-7">
                    <h3 className="allquesionhead">Top Questions</h3>
                  </div>
                  <div className="col-5 col-xl-3 col-lg-4 col-md-5">
                    {askquestionsign}
                  </div>
                </div>

                <div className="row margquesions1">
                  <div className="col-lg-4 col-xl-6 col-md-3">
                    <h4 className="countallquesion">
                      {totalQuestion} Questions
                    </h4>
                  </div>
                  <div className="col-lg-5 col-xl-5 col-md-6">
                    <div className="row">
                      <ul className="list-group list-group-horizontal">
                        <a
                          href="#homepagelink"
                          className="categoryonmaincontent list-group-item active list-group-item-action border border-secondary"
                        >
                          Newest
                        </a>
                        <a
                          href="#homepagelink"
                          className="categoryonmaincontent list-group-item d-flex align-items-center list-group-item-action border border-secondary"
                        >
                          <span className="badge badge-secondary">15</span>
                          &nbsp;&nbsp;Top
                        </a>
                        <a
                          href="#homepagelink"
                          className="categoryonmaincontent list-group-item list-group-item-action border border-secondary"
                        >
                          Views
                        </a>
                        <a
                          href="#homepagelink"
                          className="categoryonmaincontent list-group-item list-group-item-action border border-secondary"
                        >
                          Oldest
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr />

                <Questions onhandleCountChange={handleCountChange} />

                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a
                        className="page-link"
                        href="#homepagelink"
                        tabIndex="-1"
                      >
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#1">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#1">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#1">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#homepagelink">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-4 bgmoredark">
                <br />
                <SideFeatured />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

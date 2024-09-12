import React, { useEffect, useState } from "react";
import "./question.css";
import Navbar from "../NavBar/Navbar.js";
import { SideFeatured } from "../SideFeatured/Sidefeatured.js";
import { AskQuestion } from "../AskQuestion/askquestion";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useCookies } from "react-cookie";
import axios from "axios";
import AnswerPost from "./postAnswer.js";
import Answer from "./questionAnswer.js";
import Sidebar from "../HomePage/Sidebar.js";
import EditQuestion from "./editQuestion.js";
import ShareLink from "./ShareLink.js";

const Question = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);
  const [question, setQuestion] = useState({ answers: [] });
  const [questionTags, setQuestionTags] = useState([]);
  const [questionCountVote, setQuestionCountVote] = useState(null);
  const [editQuestionLink, setEditQuestionLink] = useState(<span>&nbsp;</span>);
  const [deleteQuestionLink, setDeleteQuestionLink] = useState(
    <span>&nbsp;</span>
  );

  const { question_id } = useParams();
  const jwttoken = cookies.jwttokenloginuser || "";
  const userid = cookies.userid;

  useEffect(() => {
    const getQuestion = async () => {
      try {
        console.log("JWT Token:", jwttoken);
        console.log("cookie:", cookies);
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/question/public/question?id=${question_id}`
        );
        const tags = res.data.tags.map((tag) => (
          <div className="question-div" key={tag}>
            <a href="#hhh">
              <span className="badge question-tags">{tag}</span>
            </a>
          </div>
        ));

        setQuestionTags(tags);
        setQuestionCountVote(
          res.data.liked_by.length - res.data.unliked_by.length
        );
        setQuestion(res.data);

        if (jwttoken && userid === res.data.posted_by) {
          setEditQuestionLink(
            <span
              className="fc-light mr2"
              data-toggle="modal"
              data-target={`#editQuestion${res.data._id}`}
            >
              <a href="#editQuestion">&nbsp;&nbsp;edit &nbsp;</a>
            </span>
          );
          setDeleteQuestionLink(
            <span className="fc-light mr2">
              <a href="#deleteQuestion" onClick={deleteQuestion}>
                delete
              </a>
            </span>
          );
        }
      } catch (err) {
        window.alert("Error from server!!", err);
      }
    };

    getQuestion();
  }, [question_id, jwttoken, userid]);

  const deleteQuestion = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/question/questiondelete`,
        {
          questionid: question_id,
          jwttokenloginuser: jwttoken,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            jsonwebtoken: jwttoken, // Include the token in the headers
          },
          withCredentials: true, // If you need to send credentials with the request
        }
      );
      window.alert(res.data.message);
      navigate("/");
    } catch (err) {
      window.alert("Error: " + err.response?.data?.error || "Unknown Error");
    }
  };

  const addQuestionVote = async (vote) => {
    if (jwttoken) {
      const prevCount = questionCountVote;
      setQuestionCountVote("loading...");

      try {
        const response = await axios.post(
          "https://askoverflow-server.vashishth-patel.repl.co/questionvote",
          {
            questionid: question._id,
            vote: vote,
            jwttokenloginuser: jwttoken,
          }
        );
        const givenVote = response.data.given_vote;
        setQuestionCountVote(prevCount + givenVote);
      } catch (error) {
        window.alert(error.response.data.error);
        setQuestionCountVote(prevCount);
      }
    } else {
      window.alert("Please login to vote");
    }
  };

  const allAnswers = question.answers.map((ans, index) => (
    <Answer
      key={ans._id}
      answer={ans}
      mtype={"answer"}
      aid={index + 1}
      question_owner={question.posted_by}
      question_id={question._id}
    />
  ));

  const profileUrl = `https://avatars.dicebear.com/api/gridy/${question.asked_by}.svg`;

  return (
    <div>
      <Navbar />
      <div className="maincontent">
        <div className="row">
          <Sidebar />
          <div className="col-sm-9 col-md-10 col-12 bgmoredark cssforpadTomaincontent">
            <div className="row">
              <div className="col-lg-8 col-md-10 col-12">
                <div className="row margquesions">
                  <div className="col-12">
                    {jwttoken ? (
                      <div>
                        <button
                          className="float-right btnaskquestion btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#askquestionmodal"
                        >
                          Ask Question
                        </button>
                        <AskQuestion />
                      </div>
                    ) : (
                      <button
                        className="float-right btnaskquestion btn btn-secondary"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        Login To Ask Question
                      </button>
                    )}
                  </div>
                </div>
                <div className="row margquesions">
                  <div className="col-lg-1 col-md-1 col-sm-1 col-2">
                    <div>
                      <div
                        className="btnupdown btn-primary"
                        onClick={() => addQuestionVote(1)}
                      >
                        <i className="fas btnupdownicon fa-chevron-up"></i>
                      </div>
                    </div>
                    <div className="mrginevotescountanswer">
                      {questionCountVote}
                    </div>
                    <div>
                      <div
                        className="btnupdown btn-primary"
                        onClick={() => addQuestionVote(-1)}
                      >
                        <i className="fas btnupdownicon fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-11 col-md-11 col-sm-11 col-10">
                    <div
                      itemprop="name"
                      className="fs-headline1 ow-break-word mb8 flex--item fl1"
                    >
                      <a
                        href={`/question/${question_id}`}
                        className="question-hyperlink"
                      >
                        {question.header}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row margquesions">
                  <div className="col-lg-7 col-7 askdetails">
                    <span className="fc-light mr2">Asked on</span> &nbsp;
                    <span className="fc-dark mr2">{question.posted_on}</span> |
                    &nbsp;
                    <span className="fc-light mr2">Viewed</span> &nbsp;
                    <span className="fc-dark mr8">{question.views} times</span>
                  </div>
                  <div className="col-lg-5 col-5 askdetails">
                    <span className="fc-light mr2">Posted by</span> &nbsp;
                    <img
                      src={profileUrl}
                      alt="user avatar"
                      width="32"
                      height="32"
                      className="bar-sm"
                    />{" "}
                    &nbsp; <a href="#hello">{question.asked_by}</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <ShareLink
                      mylink={question._id}
                      mtype={"question"}
                      aid={1}
                    />
                    {editQuestionLink}
                    <div
                      className="modal fade"
                      id={`editQuestion${question._id}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="editQuestionCenterTitle"
                      aria-hidden="true"
                    >
                      <EditQuestion
                        questionHeader={question.header}
                        questionTags={question.tags}
                        questionBody={question.body}
                        questionId={question._id}
                      />
                    </div>
                    <span className="fc-light mr2">
                      <a href="#hello">follow</a>
                    </span>{" "}
                    &nbsp;
                  </div>
                  {deleteQuestionLink}
                </div>
                <hr />
                <div className="row margquesions1">
                  <div className="row">
                    <div className="col-10 offset-1">
                      <ReactMarkdown>{question.body}</ReactMarkdown>
                    </div>
                  </div>
                  <div>{questionTags}</div>
                </div>
                <hr />
                <div className="row justify-content-center margquesions1">
                  <div className="col-lg-8 col-sm-8 col-12">
                    <h3>{question.answers.length} Answers:</h3>
                  </div>
                  <div className="col-lg-4 col-sm-4 col-12">
                    <div className="row">
                      <div className="col-lg-4 col">sorted by</div>
                      <div className="col-lg-2 col">
                        <select>
                          <option>ascending</option>
                          <option>descending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {allAnswers}
                <hr />
                {jwttoken ? (
                  <AnswerPost qid={question._id} username={cookies.username} />
                ) : (
                  <div>
                    <button
                      className="float-right btnaskquestion btn btn-secondary"
                      data-toggle="modal"
                      data-target="#loginModal"
                    >
                      Login to post answer
                    </button>
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-2 col-12">
                <SideFeatured />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;

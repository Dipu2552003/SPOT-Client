import React, { useState, useEffect } from "react";
import "./questions.css";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import $ from "jquery";

const Questions = ({ onhandleCountChange }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page number state
  const [questionsPerPage] = useState(15); // Set the number of questions per page

  useEffect(() => {
    // Load all questions once
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/question/public/publicquestionsget`
      )
      .then((res) => {
        setQuestions(res.data);
        const total = res.data.length;
        onhandleCountChange(total, res.data[total - 1]?.counttags || 0); // Handling empty array case
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      // Cleanup the loading GIF if necessary
      $(".toremovegif").remove();
    };
  }, [onhandleCountChange]);

  // Get current questions based on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render question list
  const renderQuestionList = () => {
    if (currentQuestions.length === 0) {
      return "No questions are found!";
    } else {
      return currentQuestions.map((question, k) => (
        <QuestionCard question={question} key={k} />
      ));
    }
  };

  return (
    <div className="questionclass">
      {renderQuestionList()}
      {/* Pagination controls */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* Render page numbers dynamically */}
          {Array.from(
            { length: Math.ceil(questions.length / questionsPerPage) },
            (_, index) => (
              <li
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index}
              >
                <a
                  className="page-link"
                  href="#!"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Questions;

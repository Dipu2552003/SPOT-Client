import React, { useState } from "react";
import "./askquestion.css";
import $ from "jquery";
import { useCookies } from "react-cookie";
import ReactMarkdown from "react-markdown";

const AskQuestion = (props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [markdownContent, setMarkdownContent] = useState("");

  const submitaquestion = () => {
    let questionheader = $("#question-header").val();
    let questiontags = $("#question-tags").val();
    let questionbody = $("#question-body").val();

    if (questionheader === "" || questiontags === "" || questionbody === "") {
      window.alert("Some Fields are empty");
    } else {
      var arraytags = questiontags.split(",");
      console.log(arraytags);
      console.log(questionheader);
      console.log(questionbody);

      const postQuestionData = async () => {
        try {
          const token = cookies.jwttokenloginuser; // Ensure this is correct
          console.log("JWT Token:", token);
          console.log(
            "Request Body:",
            JSON.stringify({
              header: questionheader,
              tags: arraytags,
              body: questionbody,
              jwttokenloginuser: token,
            })
          );

          const res = await fetch(
             `${process.env.REACT_APP_API_BASE_URL}/api/question/questionpost`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                jsonwebtoken: token, // Add the token in the headers
              },
              credentials: "include",
              body: JSON.stringify({
                header: questionheader,
                tags: arraytags,
                body: questionbody,
                jwttokenloginuser: token,
              }),
            }
          );

          const resjson = await res.json();

          console.log("Response JSON:", resjson);

          if (res.status === 201) {
            window.alert(resjson.message);
            window.location.reload();
          } else {
            window.alert(resjson.error);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      };

      postQuestionData();
    }
  };

  return (
    <div
      class="modal fade"
      id="askquestionmodal"
      tabindex="-1"
      aria-labelledby="askquestionmodal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-fullscreen modal-xl ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="askquestionmodal">
              <i class="fab fa-stack-overflow"></i>&nbsp;&nbsp;Ask Question
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="question-header" class="col-form-label">
                  Question Header
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type A Question Header..."
                  id="question-header"
                  name="question-header"
                />
              </div>
              <div class="mb-3">
                <label for="question-tags" class="col-form-label">
                  Question Tags
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="If There Are Multiple, Saperate With Them With Commas..."
                  id="question-tags"
                  name="question-tags"
                />
              </div>
              <div class="mb-3">
                <label for="question-body" class="col-form-label">
                  Question Body
                </label>
                <textarea
                  class="form-control"
                  rows="13"
                  placeholder="Please Include Question Body..."
                  id="question-body"
                  name="question-body"
                  onChange={(e) => setMarkdownContent(e.target.value)}
                ></textarea>
              </div>
              {markdownContent && (
                <div class="mb-3 border border-primary rounded-5 p-3">
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              )}
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={submitaquestion}
            >
              Submit A Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AskQuestion };

import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const PostAnswer = () => {
  const [answerload, setanswerload] = useState("Post Your Answer");
  const [markdownContent, setMarkdownContent] = useState("");
  const [cookies] = useCookies(["user"]);
  const { question_id } = useParams();
  const jwttoken = cookies.jwttokenloginuser || "";

  const PostAnswerServer = async () => {
    if (markdownContent === "") {
      window.alert("No text available");
      return;
    }

    setanswerload("Please Wait For A Moment...");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/answer/answerpost`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            jsonwebtoken: jwttoken, // Include the token in the headers
          },
          credentials: "include",
          body: JSON.stringify({
            questionid: question_id,
            body: markdownContent,
          }),
        }
      );

      const resjson = await res.json();
      console.log("Response JSON:", resjson);

      if (res.status === 201) {
        window.alert(resjson.message || "Answer posted successfully");
        window.location.replace(`/question/${question_id}`);
      } else {
        window.alert(
          resjson.error || "Failed to post answer. Please try again."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      window.alert("Failed to post answer. Please try again.");
    } finally {
      setanswerload("Post Your Answer");
    }
  };

  return (
    <div className="container">
      <h2>Post Your Answer</h2>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="5"
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          placeholder="Type your answer here..."
        ></textarea>
      </div>
      <button onClick={PostAnswerServer} className="btn btn-primary">
        {answerload}
      </button>
    </div>
  );
};

export default PostAnswer;

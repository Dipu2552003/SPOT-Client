import React from "react";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import UserQuestion from "./userquestion";

const Questions = (props) => {
  var { setCountQuestion } = props;
  const history = useNavigate();
  const [cookies] = useCookies(["user"]);
  var imgforload1 = (
    <img
      src="https://user-images.githubusercontent.com/76911582/196022890-ace53133-d1ec-49ae-83e0-45135f1116b4.gif"
      width="70px"
      alt="#img"
    />
  );

  const [AllQuestions, setAllQuestions] = useState(imgforload1);
  const QuestionDataGet = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/user/getuserquestions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            jsonwebtoken: cookies.jwttokenloginuser, // Include the token in the headers
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );
      const responsedata = await res.json();
      const allquestion = responsedata.map((ans) => (
        <UserQuestion question={ans} />
      ));
      setAllQuestions(allquestion);
      setCountQuestion(allquestion.length);
    } catch (err) {
      console.log(err);
      // history("/");
    }
  };

  useEffect(() => {
    QuestionDataGet();
  }, []);

  return (
    <div class="container">
      <h3>My Questions</h3>
      <br></br>
      <table class="table table-responsive table-bordered">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Up Votes</th>
            <th scope="col">Down Votes</th>
            <th scope="col">Total Answers</th>
            <th scope="col">Total Views</th>
            <th scope="col">Verified Answer?</th>
          </tr>
        </thead>
        <tbody>{AllQuestions}</tbody>
      </table>
    </div>
  );
};
export default Questions;

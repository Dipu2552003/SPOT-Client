import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserAnswer from "./useranswer";

const Answer = (props) => {
  const { setCountAnswer } = props;
  const [cookies] = useCookies(["user"]);
  const [AllAnswers, setAllAnswers] = useState(
    <img
      src="https://user-images.githubusercontent.com/76911582/196022890-ace53133-d1ec-49ae-83e0-45135f1116b4.gif"
      width="70px"
      alt="#img"
    />
  );

  const AnswerDataGet = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/getuseranswers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jsonwebtoken: cookies.jwttokenloginuser, // Include the token in the headers
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      const responsedata = await res.json();
      const allAnswers = responsedata.map((answer) => (
        <UserAnswer key={answer._id} answer={answer} />
      ));
      setAllAnswers(allAnswers);
      setCountAnswer(allAnswers.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AnswerDataGet();
  }, []);

  return (
    <div className="container">
      <h3>My Answers</h3>
      <br />
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th scope="col">Question Link</th>
            <th scope="col">Answer</th>
            <th scope="col">Up Votes</th>
            <th scope="col">Down Votes</th>
            <th scope="col">Verified Answer?</th>
          </tr>
        </thead>
        <tbody>{AllAnswers}</tbody>
      </table>
    </div>
  );
};

export default Answer;

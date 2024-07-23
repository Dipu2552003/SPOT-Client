import React from "react";

const UserAnswer = (props) => {
  const { answer } = props;

  var isverified = "No";
  if (answer.is_verified) {
    isverified = "Yes";
  }

  return (
    <>
      <tr>
        <th scope="row">
          <a href={`/question/${answer.questionId}`}>click here</a>
        </th>
        <td>{answer.answer_body}</td>
        <td>{answer.liked_by.length}</td>
        <td>{answer.unliked_by.length}</td>
        <td>{isverified}</td>
      </tr>
    </>
  );
};
export default UserAnswer;

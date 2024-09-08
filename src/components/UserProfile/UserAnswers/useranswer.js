import React from "react";

const UserAnswer = (props) => {
  const { answer } = props;
  const isVerified = answer.is_verified ? "Yes" : "No";

  return (
    <tr>
      <th scope="row">
        <a href={`/question/${answer.questionId}`}>click here</a>
      </th>
      <td>{answer.answer_body}</td>
      <td>{answer.liked_by.length}</td>
      <td>{answer.unliked_by.length}</td>
      <td>{isVerified}</td>
    </tr>
  );
};

export default UserAnswer;

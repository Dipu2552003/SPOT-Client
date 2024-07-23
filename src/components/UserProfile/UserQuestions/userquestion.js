import React from "react";

const UserQuestion = (props) => {
  const { question } = props;
  var isverified = "No";
  if (question.is_answer_verified) {
    isverified = "Yes";
  }

  return (
    <>
      <tr>
        <th scope="row">
          <a href={`/question/${question._id}`}>{question.header}</a>
        </th>
        <td>{question.liked_by.length}</td>
        <td>{question.unliked_by.length}</td>
        <td>{question.answers.length}</td>
        <td>{question.views}</td>
        <td>{isverified}</td>
      </tr>
    </>
  );
};
export default UserQuestion;

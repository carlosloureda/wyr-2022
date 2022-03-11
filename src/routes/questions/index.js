import { useNavigate } from "react-router-dom";

import questions from "../../data/questions";

const QuestionsRoute = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Questions</h1>
      <ul>
        {Object.values(questions).map((question) => {
          return (
            <li key={question.id}>
              <p>{question.optionOne.text}</p>
              <button onClick={() => navigate(`/questions/${question.id}`)}>
                View Question
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionsRoute;

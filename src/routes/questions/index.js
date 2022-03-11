import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions, questionsSelector } from "../../redux/questionsSlice";
import { useEffect } from "react";

const QuestionsRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(questionsSelector);

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    throw new Error(error);
  }
  return (
    <>
      <h1>AQuestions</h1>
      <ul>
        {questions &&
          Object.values(questions)?.map((question) => {
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

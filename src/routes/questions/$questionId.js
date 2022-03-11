import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionById } from "../../redux/questionsSlice";
import { useEffect } from "react";

const Question = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { questions, error, loading } = useSelector((state) => state.questions);

  const question = (questions && questions[params.questionId]) || null;

  useEffect(() => {
    if (!question && !error) {
      dispatch(fetchQuestionById(params.questionId));
    }
  }, [dispatch, question, error, params.questionId]);

  return (
    <>
      <h1>Question Detail {params.questionId}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {question && <p>Author: {question.author}</p>}
    </>
  );
};

export default Question;

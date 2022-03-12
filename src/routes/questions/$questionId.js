import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchQuestionById } from "../../redux/questionsSlice";
import AnsweredQuestionDetail from "../../components/Questions/AnsweredQuestionDetail/AnsweredQuestionDetail";
import UnansweredQuestionDetail from "../../components/Questions/UnansweredQuestionDetail";
import useAuth from "../../context/AuthContext";

const useDidCurrentUserAnswer = (question) => {
  const { currentUser } = useAuth();
  return (
    question.optionOne.votes.includes(currentUser.id) ||
    question.optionOne.votes.includes(currentUser.id)
  );
};

const Question = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { questions, error, loading } = useSelector((state) => state.questions);

  const question = (questions && questions[params.questionId]) || null;

  const currentUserDidAnswer = useDidCurrentUserAnswer(question);

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
      {currentUserDidAnswer && (
        <AnsweredQuestionDetail question={question} loading={loading} />
      )}
      {!currentUserDidAnswer && (
        <UnansweredQuestionDetail question={question} loading={loading} />
      )}

      {/* {question && <p>Author: {question.author}</p>} */}
    </>
  );
};

export default Question;

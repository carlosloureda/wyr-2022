import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchQuestionById } from "@/redux/questionsSlice";
import AnsweredQuestionDetail from "@/components/Questions/AnsweredQuestionDetail/AnsweredQuestionDetail";
import UnansweredQuestionDetail from "@/components/Questions/UnansweredQuestionDetail";
import useAuth from "@/context/AuthContext";

const useDidCurrentUserAnswer = (question) => {
  const { currentUser } = useAuth();
  return (
    (question &&
      (question.optionOne.votes.includes(currentUser.id) ||
        question.optionOne.votes.includes(currentUser.id))) ||
    false
  );
};

const Question = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { questions, error, loading } = useSelector((state) => state.questions);
  const hasError = error?.action === "fetchQuestionById";
  const question = (questions && questions[params.questionId]) || null;
  const currentUserDidAnswer = useDidCurrentUserAnswer(question);

  useEffect(() => {
    if (!question && !error.message) {
      dispatch(fetchQuestionById(params.questionId));
    }
  }, [dispatch, question, error, params.questionId]);

  return (
    <>
      <h1>Question Detail {params.questionId}</h1>
      {loading && <div>Loading...</div>}
      {hasError && <div>{error.message}</div>}
      {question && currentUserDidAnswer && (
        <AnsweredQuestionDetail question={question} loading={loading} />
      )}
      {question && !currentUserDidAnswer && (
        <UnansweredQuestionDetail question={question} loading={loading} />
      )}

      {/* {question && <p>Author: {question.author}</p>} */}
    </>
  );
};

export default Question;

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
        question.optionTwo.votes.includes(currentUser.id))) ||
    false
  );
};

const Question = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { questions, error, loading, action } = useSelector(
    (state) => state.questions
  );
  const hasError = error.message && action === "fetchQuestionById";
  const question = (questions && questions[params.questionId]) || null;
  const currentUserDidAnswer = useDidCurrentUserAnswer(question);

  useEffect(() => {
    if (!question && !error.message) {
      dispatch(fetchQuestionById(params.questionId));
    }
  }, [dispatch, question, error, params.questionId]);

  return (
    <div className="w-[650px] border-2 border-slate-500 flex flex-col">
      {loading && action === "fetchQuestionById" && <div>Loading...</div>}
      {hasError && <div>{error.message}</div>}
      {question && currentUserDidAnswer && (
        <AnsweredQuestionDetail
          question={question}
          loading={loading && action === "answerQuestions"}
        />
      )}
      {question && !currentUserDidAnswer && (
        <UnansweredQuestionDetail
          question={question}
          loading={loading && action === "answerQuestions"}
        />
      )}
    </div>
  );
};

export default Question;

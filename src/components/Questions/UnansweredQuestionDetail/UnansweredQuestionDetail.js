import { useDispatch } from "react-redux";

import useAuth from "@/context/AuthContext";
import { answerQuestion } from "@/redux/questionsSlice";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Button from "@/components/ui/Button";

const UnansweredQuestionDetail = ({ question, loading }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const onSubmitAnswer = (e) => {
    e.preventDefault();
    dispatch(
      answerQuestion({
        id: question.id,
        question: question,
        answer: e.target.elements.option.value,
        userId: currentUser.id,
      })
    );
  };
  return (
    <QuestionCard
      question={question}
      renderQuestion={() => {
        return (
          <>
            <h2 className="font-bold text-xl">Would You Rather:</h2>
            <form onSubmit={onSubmitAnswer} className="my-2">
              <div className="flex flex-row items-center py-2 ml-2">
                <input
                  type="radio"
                  name="option"
                  value="optionOne"
                  id="optionOne"
                  required
                  className="mr-2"
                />
                <label htmlFor="optionOne">{question.optionOne.text}</label>
              </div>
              <div className="flex flex-row items-center pb-5  ml-2">
                <input
                  type="radio"
                  name="option"
                  value="optionTwo"
                  id="optionTwo"
                  required
                  className="mr-2"
                />
                <label htmlFor="optionTwo">{question.optionTwo.text}</label>
              </div>
              <Button disabled={loading}>
                Submit{loading && "ing"} answer
              </Button>
            </form>
          </>
        );
      }}
    />
  );
};

export default UnansweredQuestionDetail;

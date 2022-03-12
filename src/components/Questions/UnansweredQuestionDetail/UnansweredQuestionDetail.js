import { useDispatch } from "react-redux";

import useAuth from "@/context/AuthContext";
import { answerQuestion } from "@/redux/questionsSlice";

const UnansweredQuestionDetail = ({ question, loading }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const onSubmitAnswer = (e) => {
    e.preventDefault();
    dispatch(
      answerQuestion({
        id: question.id,
        answer: e.target.elements.option.value,
        userId: currentUser.id,
      })
    );
  };
  return (
    <div>
      <h3>{question.author} asks</h3>
      <div>
        <img
          src={question.authorAvatarUrl}
          alt={`Avatar of ${question.author}`}
        />
      </div>
      <div>
        <p>Would You Rather:</p>
        <form onSubmit={onSubmitAnswer}>
          <p>{question.optionOne.text}</p>

          <div>
            <input
              type="radio"
              name="option"
              value="optionOne"
              id="optionOne"
              required
            />
            <label htmlFor="optionOne">{question.optionOne.text}</label>
          </div>
          <div>
            <input
              type="radio"
              name="option"
              value="optionTwo"
              id="optionTwo"
              required
            />
            <label htmlFor="optionOne">{question.optionTwo.text}</label>
          </div>
          <button disabled={loading}>Submit answer</button>
        </form>
      </div>
    </div>
  );
};
export default UnansweredQuestionDetail;

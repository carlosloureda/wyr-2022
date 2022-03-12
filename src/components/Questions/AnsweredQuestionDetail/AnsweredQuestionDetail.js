import { useNavigate } from "react-router-dom";

const AnsweredQuestionDetail = ({ question }) => {
  const navigate = useNavigate();
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
        <p>{question.optionOne.text}</p>
        <button onClick={() => navigate(`/questions/${question.id}`)}>
          View Poll
        </button>
      </div>
    </div>
  );
};
export default AnsweredQuestionDetail;

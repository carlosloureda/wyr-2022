import useAuth from "@/context/AuthContext";

const AnsweredQuestionDetail = ({ question }) => {
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = Math.round(
    (optionOneVotes / totalVotes) * 100,
    2
  );
  const optionTwoPercentage = Math.round(
    (optionTwoVotes / totalVotes) * 100,
    2
  );

  const { currentUser } = useAuth();
  const hasMyVote = (option) => option.votes.includes(currentUser.id);

  return (
    <div>
      <h3>{question.author} asks</h3>
      <div>
        <img
          src={question.authorAvatarUrl}
          alt={`Avatar of ${question.author}`}
        />
      </div>
      {/* Details */}
      <div>
        <p>{question.optionOne.text}</p>
        <p>{`${optionOneVotes} of ${totalVotes}`}</p>
        <p>{optionOnePercentage}%</p>
        {hasMyVote(question.optionOne) && <p>My Vote</p>}
      </div>
      <div>
        <p>{question.optionTwo.text}</p>
        <p>{`${optionTwoVotes} of ${totalVotes}`}</p>
        <p>{optionTwoPercentage}%</p>
        {hasMyVote(question.optionTwo) && <p>My Vote</p>}
      </div>
    </div>
  );
};
export default AnsweredQuestionDetail;

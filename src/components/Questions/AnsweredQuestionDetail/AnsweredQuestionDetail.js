import useAuth from "@/context/AuthContext";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import clsx from "clsx";

const ProgressBar = ({ progress, className, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "w-full bg-gray-200 rounded-full h-3.5 dark:bg-gray-200",
        className
      )}
    >
      <div
        class="bg-indigo-600 h-3.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
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
    <QuestionCard
      question={question}
      renderQuestion={() => {
        return (
          <div>
            <div
              className={clsx(
                "flex flex-col min-h-[120px] justify-around items-center border-2",
                { "bg-amber-500": hasMyVote(question.optionOne) }
              )}
            >
              <h3 className="font-bold text-l">{question.optionOne.text}</h3>
              <div className="w-full flex flex-row items-center gap-4 px-4">
                <ProgressBar progress={optionOnePercentage} />
                <p>{optionOnePercentage}%</p>
              </div>
              <p>{`${optionOneVotes} out of ${totalVotes}`}</p>

              {/* {hasMyVote(question.optionOne) && <p>My Vote</p>} */}
            </div>
            <div
              className={clsx(
                "flex flex-col min-h-[120px] justify-around items-center border-2 mt-4",
                { "bg-amber-500": hasMyVote(question.optionTwo) }
              )}
            >
              <h3 className="font-bold text-l">{question.optionTwo.text}</h3>
              <div className="w-full flex flex-row items-center gap-4 px-4">
                <ProgressBar progress={optionTwoPercentage} />
                <p>{optionTwoPercentage}%</p>
              </div>
              <p>{`${optionTwoVotes} out of ${totalVotes}`}</p>
              {/* {hasMyVote(question.optionTwo) && <p>My Vote</p>} */}
            </div>
          </div>
        );
      }}
    />
  );
};
export default AnsweredQuestionDetail;

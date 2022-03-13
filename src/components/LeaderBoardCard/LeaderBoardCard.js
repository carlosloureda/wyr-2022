import clsx from "clsx";
import Avatar from "../ui/Avatar";

const LeaderBoardCard = ({ user, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "w-[650px] border-2 border-slate-500 flex flex-row gap-4 p-6",
        { [props.className]: props.className }
      )}
    >
      <div className="basis-1/4">
        <Avatar size={32} avatarURL={user.avatarURL} altText={user.id} />
      </div>
      <div className="flex flex-col flex-1 basis-2/4">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-row justify-between">
            <p>Answered Questions</p>
            <p className="text-l font-bold">{user.totalAnswers}</p>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <p>Created Questions</p>
            <p className="text-l font-bold">{user.totalQuestions}</p>
          </div>
        </div>
      </div>
      <div className="basis-1/4 flex flex-col">
        <div className="bg-black text-white text-l font-bold p-4 text-center tracking-wide">
          Score
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-indigo-400 w-14 h-14 rounded-full flex justify-center items-center border-2 border-indigo-900">
            <p className="text-xl font-bold">{user.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardCard;

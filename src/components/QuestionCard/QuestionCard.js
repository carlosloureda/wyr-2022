import clsx from "clsx";

import Avatar from "@/components/ui/Avatar";

const QuestionCard = ({ question, renderQuestion, ...props }) => {
  return (
    <div
      {...props}
      className={clsx("w-[650px] border-2 border-slate-500 flex flex-col", {
        [props.className]: props.className,
      })}
    >
      <div className="bg-black text-white text-l font-bold p-4 text-left tracking-wide">
        {/* TODO: should be name not id */}
        <h3>{question.author} asks:</h3>
      </div>
      <div className="flex p-4">
        <div className="basis-1/4 flex justify-center items-center">
          <Avatar
            size={30}
            avatarURL={question.authorAvatarUrl}
            altText={`Avatar of ${question.author}`}
          />
        </div>
        <div className="basis-3/4 flex-1 flex flex-col justify-around pl-6">
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

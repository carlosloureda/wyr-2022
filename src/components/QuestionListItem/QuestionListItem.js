import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import clsx from "clsx";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button/Button";

const QuestionListItem = ({ question, ...props }) => {
  const navigate = useNavigate();

  // const clickbait2 = useCallback(
  //   (optionText) => (optionText ? `...${optionText.slice(0, 15)}...` : ""),
  //   []
  // );

  const clickbait = useMemo(
    () => (question ? `...${question.optionOne.text.slice(0, 15)}...` : ""),
    [question]
  );

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
        <div className="basis-1/4">
          <Avatar
            size={32}
            avatarURL={question.authorAvatarUrl}
            altText={`Avatar of ${question.author}`}
          />
        </div>
        <div className="basis-3/4 flex-1 flex flex-col justify-around">
          <h2 className="font-bold text-xl">Would You Rather:</h2>
          {/* <p>{clickbait2(question.optionOne.text)}</p> */}
          <p>{clickbait}</p>
          <Button
            kind="primary"
            onClick={() => navigate(`/questions/${question.id}`)}
            className="mt-4"
          >
            View Poll
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;

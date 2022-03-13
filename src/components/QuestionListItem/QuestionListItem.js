import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Button from "@/components/ui/Button";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

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
    <QuestionCard
      question={question}
      renderQuestion={() => {
        return (
          <>
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
          </>
        );
      }}
    />
  );
};

export default QuestionListItem;

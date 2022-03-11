import { useParams } from "react-router-dom";

const Question = () => {
  const params = useParams();
  // TODO: if question doesn't exist, redirect to 404
  return (
    <>
      <h1>Question Detail {params.questionId}</h1>
    </>
  );
};

export default Question;

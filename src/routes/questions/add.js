import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const navigate = useNavigate();

  const onAddQuestion = () => {
    // TODO: generate new ID
    const newQuestionId = "123";
    navigate(`/questions/${newQuestionId}`);
  };
  return (
    <form onSubmit={onAddQuestion}>
      <h1>Add a new question</h1>
      <button>Submit</button>
    </form>
  );
};

export default AddQuestion;

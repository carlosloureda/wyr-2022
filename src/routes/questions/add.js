import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addQuestion } from "@/redux/questionsSlice";
import useAuth from "@/context/AuthContext";

const AddQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { loading } = useSelector((state) => state.questions);

  const onAddQuestion = async (e) => {
    e.preventDefault();
    const optionOne = e.target.elements.optionOne.value;
    const optionTwo = e.target.elements.optionTwo.value;
    const result = await dispatch(
      addQuestion({
        optionOne,
        optionTwo,
        author: currentUser.id,
      })
    );
    if (!result.error) {
      navigate(`/questions/${result.payload.id}`);
    } else {
      // TODO: add some alerts?
      alert("error happened: ", result.error);
    }
  };

  return (
    <>
      <h1>Add a new question</h1>
      <form onSubmit={onAddQuestion}>
        <h2>Would You Rather?</h2>

        <div>
          <label htmlFor="optionOne">Enter Option One:</label>
          <input
            type="text"
            id="optionOne"
            name="optionOneText"
            required
            placeholder="always be 10 minutes late"
          />
        </div>
        <div>
          <label htmlFor="optionTwo">Enter Option Two:</label>
          <input
            type="text"
            required
            id="optionTwo"
            name="optionTwoText"
            placeholder="always be 20 minutes early"
          />
        </div>

        <button disabled={loading}>Save Question</button>
      </form>
    </>
  );
};

export default AddQuestion;

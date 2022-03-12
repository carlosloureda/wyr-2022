import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addQuestion } from "@/redux/questionsSlice";

const AddQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.questions);

  const onAddQuestion = async (e) => {
    e.preventDefault();
    const optionOne = e.target.elements.optionOne.value;
    const optionTwo = e.target.elements.optionTwo.value;

    const result = await dispatch(
      addQuestion({
        optionOne,
        optionTwo,
        // TODO: retrieve ID of user from localstorage/context
        author: "carlosloureda",
      })
    );
    if (!result.error) {
      navigate(`/questions/${result.payload.id}`);
    } else {
      // TODO: add some alerts?
      alert("error happened: ", result.error);
    }

    // error.message
    // {
    //   "type": "questions/addQuestion/fulfilled",
    //   "payload": {
    //       "id": "e0059924-547b-4e88-92f1-f9ece776a111",
    //       "author": "carlosloureda",
    //       "timestamp": 1647044175835,
    //       "optionOne": {
    //           "votes": [],
    //           "text": "asd"
    //       },
    //       "optionTwo": {
    //           "votes": [],
    //           "text": "asd"
    //       }
    //   },
    //   "meta": {
    //       "arg": {
    //           "optionOne": "asd",
    //           "optionTwo": "asd",
    //           "author": "carlosloureda"
    //       },
    //       "requestId": "ucsLC1RZ-5UFgcX0WoJ0J",
    //       "requestStatus": "fulfilled"
    //   }
    // }
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

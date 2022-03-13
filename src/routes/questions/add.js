import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addQuestion } from "@/redux/questionsSlice";
import Button from "@/components/ui/Button";
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
    <div className="w-[650px] border-2 border-slate-500 flex flex-col ">
      <div className="bg-black text-white p-4 text-left tracking-wide h-24 text-center">
        <h2 className="text-xl font-bold pt-2">Add a new question</h2>
      </div>
      <form onSubmit={onAddQuestion} className="flex flex-col px-8 py-4">
        <h3 className="text-l font-bold">Would You Rather?</h3>
        <div className="flex flex-col pt-4">
          <label htmlFor="optionOne" className="pb-2">
            Enter Option One:
          </label>
          <input
            type="text"
            id="optionOne"
            name="optionOneText"
            required
            placeholder="always be 10 minutes late"
            className="border-2 p-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="py-4 text-center text-slate-500">
          <p>OR</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="optionOne" className="pb-2">
            Enter Option Two:
          </label>
          <input
            type="text"
            id="optionTwo"
            name="optionTwoText"
            required
            placeholder="always be 10 minutes late"
            className="border-2 p-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Button kind="primary" disabled={loading}>
            Save Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions, questionsSelector } from "../../redux/questionsSlice";
import { useEffect, useMemo } from "react";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";
import useAuth from "../../context/AuthContext";

// TODO: move to component

const QuestionItem = ({ question }) => {
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
    <div>
      <h3>{question.author} asks</h3>
      <div>
        <img
          src={question.authorAvatarUrl}
          alt={`Avatar of ${question.author}`}
        />
      </div>
      <div>
        <p>Would You Rather:</p>
        {/* <p>{clickbait2(question.optionOne.text)}</p> */}
        <p>{clickbait}</p>
        <button onClick={() => navigate(`/questions/${question.id}`)}>
          View Poll
        </button>
      </div>
    </div>
  );
};

const useSplittedQuestions = (questions) => {
  const { currentUser } = useAuth();
  const unansweredQuestions = useMemo(() => {
    return (
      questions &&
      Object.values(questions).filter(
        (q) =>
          !q.optionOne.votes.includes(currentUser.id) &&
          !q.optionTwo.votes.includes(currentUser.id)
      )
    );
  }, [questions, currentUser.id]);

  const answeredQuestions = useMemo(() => {
    return (
      questions &&
      Object.values(questions).filter(
        (q) =>
          q.optionOne.votes.includes(currentUser.id) ||
          q.optionTwo.votes.includes(currentUser.id)
      )
    );
  }, [questions, currentUser.id]);

  return { unansweredQuestions, answeredQuestions };
};

const QuestionsRoute = () => {
  const dispatch = useDispatch();
  const { questions, loading, error, allFetched } =
    useSelector(questionsSelector);

  useEffect(() => {
    if (!allFetched) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, allFetched]);

  const { unansweredQuestions, answeredQuestions } =
    useSplittedQuestions(questions);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    throw new Error(error);
  }
  return (
    <>
      <h1>Questions</h1>

      <Tabs>
        <TabList>
          <Tab>Unanswered</Tab>
          <Tab>Answered</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ul>
              {unansweredQuestions?.map((question) => {
                return (
                  <li key={question.id}>
                    <QuestionItem question={question} />
                  </li>
                );
              })}
            </ul>
            º
          </TabPanel>
          <TabPanel>
            <ul>
              {answeredQuestions?.map((question) => {
                return (
                  <li key={question.id}>
                    <QuestionItem question={question} />
                  </li>
                );
              })}
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default QuestionsRoute;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { fetchQuestions, questionsSelector } from "@/redux/questionsSlice";
import useAuth from "@/context/AuthContext";
import QuestionListItem from "@/components/QuestionListItem";

import "@reach/tabs/styles.css";

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
  const hasError = error?.action === "fetchQuestions";

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
  if (hasError) {
    throw new Error(error.message);
  }
  return (
    <>
      <Tabs className="w-[650px]">
        {({ selectedIndex, focusedIndex }) => {
          const getTabStyle = (index) =>
            `uppercase p-4 ${
              selectedIndex === index
                ? "bg-indigo-500 text-white"
                : focusedIndex === index
                ? "bg-transparent text-indigo-500"
                : "bg-transparent text-indigo-500"
            }`;
          return (
            <>
              <TabList className="flex justify-center bg-transparent mb-6 py-4 gap-4 border-indigo-700 border-0 border-b-2 ">
                <Tab className={getTabStyle(0)}>Unanswered</Tab>
                <Tab className={getTabStyle(1)}>Answered</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ul>
                    {unansweredQuestions?.map((question) => {
                      return (
                        <li key={question.id} className="mt-4 first:mt-0">
                          <QuestionListItem question={question} />
                        </li>
                      );
                    })}
                  </ul>
                </TabPanel>
                <TabPanel>
                  <ul>
                    {answeredQuestions?.map((question) => {
                      return (
                        <li key={question.id} className="mt-4 first:mt-0">
                          <QuestionListItem question={question} />
                        </li>
                      );
                    })}
                  </ul>
                </TabPanel>
              </TabPanels>
            </>
          );
        }}
      </Tabs>
    </>
  );
};

export default QuestionsRoute;

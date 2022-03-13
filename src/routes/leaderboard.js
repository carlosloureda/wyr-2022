import { useMemo } from "react";

import useFetchUsers from "@/hooks/useFetchUsers";
import LeaderBoardCard from "@/components/LeaderBoardCard";

const Leaderboard = () => {
  const { users, loading, error } = useFetchUsers();

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    return Object.values(users)
      .reduce((acc, user) => {
        return acc.concat({
          ...user,
          totalAnswers: Object.values(user.answers).length,
          totalQuestions: user.questions.length,
          score: Object.values(user.answers).length + user.questions.length,
        });
      }, [])
      .sort((a, b) => {
        return b.score - a.score;
      });
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <ul>
        {sortedUsers.map((user) => (
          <LeaderBoardCard
            key={user.id}
            user={user}
            className="mt-4 first:mt-0"
          />
        ))}
      </ul>
    </>
  );
};

export default Leaderboard;

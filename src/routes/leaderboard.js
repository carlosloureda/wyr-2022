import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";

// TODO: move to component

const LeaderboardCard = ({ user, ...props }) => {
  return (
    <div>
      <div>
        <img src={user.avatarURL} alt={user.name} />
      </div>
      <div>
        <h2>{user.name}</h2>
        <p>Answered Questions: {user.totalAnswers}</p>
        <p>Created Questions: {user.totalQuestions}</p>
      </div>
      <div>Score: {user.score}</div>
    </div>
  );
};

const Leaderboard = () => {
  /* 
    - Users: score: answered + created questions adds their score ...
    - 
  */
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    return Object.values(users)
      .reduce((acc, user) => {
        return acc.concat({
          ...user,
          totalAnswers: user.answers.length,
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
      <h1>Leaderboard</h1>
      <ul>
        {/* <pre>{JSON.stringify(sortedUsers, null, 2)}</pre> */}
        {sortedUsers.map((user) => (
          <LeaderboardCard key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
};

export default Leaderboard;

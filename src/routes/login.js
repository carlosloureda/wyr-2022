import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/context/AuthContext";
import useFetchUsers from "@/hooks/useFetchUsers";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading, login } = useAuth();
  const { users, error: errorUsers, loading: loadingUsers } = useFetchUsers();

  const onLogin = async (e) => {
    e.preventDefault();
    const selectedUser = e.target.elements.selectUser.value;
    await login(selectedUser);
    navigate("/");
  };

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/");
    }
  }, [currentUser?.id, navigate, loading]);

  if (loadingUsers) {
    return (
      <div>
        <h1>Login</h1>
        <p>Loading users ...</p>
      </div>
    );
  }

  return (
    <form onSubmit={onLogin}>
      <h1>Login</h1>
      {error ||
        (errorUsers && <p style={{ color: "red" }}>{error || errorUsers}</p>)}

      <select id="selectUser">
        {users &&
          Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
      </select>
      <button disabled={loading}>Login</button>
    </form>
  );
};

export default Login;

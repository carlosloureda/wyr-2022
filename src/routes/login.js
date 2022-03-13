import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/context/AuthContext";
import useFetchUsers from "@/hooks/useFetchUsers";
import Button from "@/components/ui/Button";

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
    <div className="border-2 min-w-[200px] max-w-[400px] m-auto my-48 p-8">
      <form onSubmit={onLogin} className="flex flex-col items-center">
        <h1 className="text-xl font-bold">Would You Rather</h1>
        {error ||
          (errorUsers && <p style={{ color: "red" }}>{error || errorUsers}</p>)}

        <div className="mt-8">
          <label htmlFor="selectUser" className="mr-8">
            Choose user:
          </label>
          <select id="selectUser" className="cursor-pointer">
            {users &&
              Object.values(users).map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}
                </option>
              ))}
          </select>
        </div>
        <Button disabled={loading} className="mt-8">
          Login{loading ? "ing" : ""}
        </Button>
      </form>
    </div>
  );
};

export default Login;

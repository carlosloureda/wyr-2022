import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <form onSubmit={onLogin}>
      <h1>Login</h1>
      <button>Login</button>
    </form>
  );
};

export default Login;

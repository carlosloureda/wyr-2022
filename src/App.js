import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./routes/login";
import Questions from "./routes/questions";
import Question from "./routes/questions/$questionId";
import AddQuestion from "./routes/questions/add";
import Leaderboard from "./routes/leaderboard";

import Layout from "./components/layout";
import NotFoundPage from "./components/NotFoundPage";
import useAuth from "./context/AuthContext";

import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route path="questions">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              }
            />
            <Route
              path=":questionId"
              element={
                <ProtectedRoute>
                  <Question />
                </ProtectedRoute>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedRoute>
                  <AddQuestion />
                </ProtectedRoute>
              }
              location="foo"
            />
          </Route>
          <Route
            path="leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="logout" element={<div>Logout</div>} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

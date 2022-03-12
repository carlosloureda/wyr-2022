import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/login";
import Questions from "./routes/questions";
import Question from "./routes/questions/$questionId";
import AddQuestion from "./routes/questions/add";
import Leaderboard from "./routes/leaderboard";

import Layout from "./components/layout";
import NotFoundPage from "./components/NotFoundPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Questions />} />
          <Route path="questions">
            <Route index element={<Questions />} />
            <Route path=":questionId" element={<Question />} />
            <Route path="add" element={<AddQuestion />} location="foo" />
          </Route>
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<div>Logout</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

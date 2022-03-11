import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

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
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Would You Rather app</title>
        <link rel="canonical" href="https://wouldyourather2022.com/" />
      </Helmet>
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
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<div>Logout</div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

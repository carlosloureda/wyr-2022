import { useCallback } from "react";

import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MainErrorBoundary from "../MainErrorBoundary";
import useAuth from "../../context/AuthContext";

const Layout = ({ seo, children, ...props }) => {
  const SEO = useCallback(
    () =>
      seo?.title ? (
        <Helmet>
          <title>{seo.title} - Would You Rather</title>
        </Helmet>
      ) : null,
    [seo?.title]
  );

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div id="layout">
      <SEO />
      <nav>
        <NavLink to="/questions">Home</NavLink>
        <Link to="/questions/add">New Question</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {currentUser ? (
          <Link
            to="/logout"
            onClick={async (e) => {
              e.preventDefault();
              await logout();
              navigate("/login");
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      {/* {children} */}
      <MainErrorBoundary>
        <Outlet />
      </MainErrorBoundary>
    </div>
  );
};

export default Layout;

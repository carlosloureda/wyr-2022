import { useCallback } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import clsx from "clsx";

import MainErrorBoundary from "@/components/MainErrorBoundary";
import useAuth from "@/context/AuthContext";
import Avatar from "@/components/ui/Avatar";

const StyledNavLink = (props) => (
  <NavLink
    {...props}
    className={({ isActive }) => {
      return clsx(
        `h-full flex items-center px-5 
      hover:bg-blue-400 hover:text-indigo-900 hover:font-normal hover:italic
      active:text-indigo-600 active:bg-blue-200`,
        {
          "text-indigo-600 bg-blue-200 font-bold": isActive,
        }
      );
    }}
  />
);

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
    <div id="layout" style={{ height: "100%" }}>
      <SEO />
      <header className="bg-indigo-900 text-sky-50 h-16 w-full flex flex-row items-center">
        <div className="basis-1/6 flex justify-center">
          <h1 className="uppercase text-xl text-amber-500">Would You Rather</h1>
        </div>
        <nav className="flex basis-3/6 justify-around h-full items-center">
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/questions/add">New Question</StyledNavLink>
          <StyledNavLink to="/leaderboard">Leader Board</StyledNavLink>
        </nav>
        <div className="flex basis-1/6" />
        <div className="basis-1/6 flex flex-row items-center gap-4 justify-end px-12">
          {currentUser ? (
            <>
              <p>{currentUser.id}</p>
              <Avatar
                size={14}
                avatarURL={currentUser.avatarURL}
                altText={`Avatar of ${currentUser.id}`}
                className="mr-2"
              />
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
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <main className="h-full flex justify-center mt-12">
        <MainErrorBoundary>
          <Outlet />
        </MainErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;

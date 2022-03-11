import { useCallback } from "react";

import { Outlet, NavLink, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Layout = ({ seo, children, ...props }) => {
  console.log("props", props);
  const SEO = useCallback(
    () =>
      seo?.title ? (
        <Helmet>
          <title>{seo.title} - Would You Rather</title>
        </Helmet>
      ) : null,
    [seo?.title]
  );

  return (
    <div id="layout">
      <SEO />
      <nav>
        <NavLink to="/questions">Home</NavLink>
        <Link to="/questions/add">New Question</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      {/* {children} */}
      <Outlet />
    </div>
  );
};

export default Layout;

import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = () => {
    return (
        <>
        <CustomLink to="/" className="nav-item">landingPage</CustomLink>
        <CustomLink to="/Signup" className="nav-item">signup</CustomLink>
        <CustomLink to="/Map" className="nav-item">map</CustomLink>
        </>
    );
    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const is = useMatch({ path: resolvedPath.pathname, end: true });
        return (
          <li className={is ? "" : ""}>
            <Link to={to} {...props}>
              {children}
            </Link>
          </li>
        );
      }
};
export default Navbar;
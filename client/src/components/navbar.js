import { React, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const rederList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light" style={{backgroundColor:"orange"}}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin")
            }}
          >
            Log Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "signin"} className="brand-logo left">
            InstagramClone
          </Link>
          <ul id="nav-mobile" className="right">
            {rederList()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

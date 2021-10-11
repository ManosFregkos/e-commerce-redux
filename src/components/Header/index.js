import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import "./styles.scss";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Simple Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/search">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">MY ACCOUNT</Link>
              </li>
              <li>
                <span onClick={() => signOut()}>LOGOUT</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>

              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
Header.defaultProps = {
  currentUser: null,
};

export default Header;

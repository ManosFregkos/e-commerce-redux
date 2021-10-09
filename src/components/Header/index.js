import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import Logo from "../../assets/logo.png";
import { auth } from "../../Firebase/utils";
import { Link } from "react-router-dom";

function Header(props) {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Simple Logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">MY ACCOUNT</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>LOGOUT</span>
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);

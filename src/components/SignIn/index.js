import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import { Link, useHistory } from "react-router-dom";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import "./styles.scss";

const SignIn = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Enter your Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Log In </Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
            </div>
            <div className="links">
              <Link to="/reset-password">Reset Password</Link>
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};
export default SignIn;

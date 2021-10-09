import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "../Forms/Button";
import { signInWithGoogle, auth } from "../../../src/Firebase/utils";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import "./styles.scss";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm();
    props.history.push("/");
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    }
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Log In </Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign In With Google</Button>
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
export default withRouter(SignIn);

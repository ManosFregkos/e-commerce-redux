import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAllAuthForms,
  resetPassword,
} from "../../redux/User/user.actions";
import "./styles.scss";

import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import { withRouter } from "react-router-dom";

const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const resetPasswordSuccess = useSelector(
    (state) => state.user.resetPasswordSuccess
  );
  const resetPasswordError = useSelector(
    (state) => state.user.resetPasswordError
  );
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        email,
      })
    );
  };

  const configAuthWrapper = {
    headline: "Email & Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, idx) => {
              return <li key={idx}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);

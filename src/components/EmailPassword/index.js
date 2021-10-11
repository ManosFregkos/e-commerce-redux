import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import "./styles.scss";

import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import { useHistory } from "react-router-dom";

const EmailPassword = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const resetPasswordSuccess = useSelector(
    (state) => state.user.resetPasswordSuccess
  );
  const userErr = useSelector((state) => state.user.userErr);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPasswordStart({
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

export default EmailPassword;

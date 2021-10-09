import React, { useState } from "react";
import "./styles.scss";

import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import { auth } from "../../Firebase/utils";
import { withRouter } from "react-router-dom";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: "https://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          setErrors(err);
        });
    } catch (err) {
      console.log(err);
    }
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

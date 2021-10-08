import React, { Component } from "react";
import "./styles.scss";

import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import { auth } from "../../Firebase/utils";
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: "https://localhost:3000/login",
    };

    try {
      const { email } = this.state;

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          this.setState({ errors: err });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, errors } = this.state;

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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={this.handleChange}
            />
            <Button type="submit">Reset Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);

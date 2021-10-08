import React, { Component } from "react";
import "./styles.scss";

import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";

const initialState = {
  email: "",
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

    try {
      const { email } = this.state;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email } = this.state;

    const configAuthWrapper = {
      headline: "Email & Password",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
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

export default EmailPassword;

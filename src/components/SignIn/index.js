import React from "react";
import Button from "../Forms/Button";
import { signInWithGoogle, auth } from "../../../src/Firebase/utils";
import FormInput from "../Forms/FormInput";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ ...initialState });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Log In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Enter Your Email"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter your Password"
                onChange={this.handleChange}
              />

              <Button type="submit">Log In </Button>
              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign In With Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;

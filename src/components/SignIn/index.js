import React from "react";
import Button from "../Forms/Button";
import { signInWithGoogle } from "../../../src/Firebase/utils";
import "./styles.scss";

class SignIn extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Log In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
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

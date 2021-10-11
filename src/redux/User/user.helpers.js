import { auth } from "../../Firebase/utils";

export const handleResetPasswordApi = (email) => {
  const config = {
    url: "https://localhost:3000/login",
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};

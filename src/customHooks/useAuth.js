import { useSelector } from "react-redux";
import { useEffect } from "react";

const useAuth = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};
export default useAuth;

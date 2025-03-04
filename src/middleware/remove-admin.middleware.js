/** @format */
import {useDispatch} from "react-redux";
import {clearUser} from "../../redux/features/userSlice";
import {useEffect} from "react";

const RemoveAdmin = ({children}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("assign_token");
    dispatch(clearUser());
  }, []);

  return <>{children}</>;
};

export default RemoveAdmin;

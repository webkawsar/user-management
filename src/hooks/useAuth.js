import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (Object.keys(user)?.length) {
    return true;
  } else return false;
};

export default useAuth;

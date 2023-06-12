import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {

      const { token, user } = JSON.parse(localAuth);
      if (token && user) {
        
        dispatch(
            userLoggedIn({
            token,
            user
          })
        );
      }
    }

    setAuthChecked(true);
    
  }, []);

  return authChecked;
};

export default useAuthCheck;

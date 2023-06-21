import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {

      const user = JSON.parse(localAuth);
      if (Object.keys(user)?.length) {

        dispatch(
            userLoggedIn({
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

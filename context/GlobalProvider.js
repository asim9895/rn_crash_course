import { useContext, useState, useEffect, createContext } from "react";
import { getLoggedInUser } from "../lib/user_routes/get_logged_in_user";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const fetch_logged_in_user = async () => {
    setisLoading(true);
    let result = await getLoggedInUser();
    console.log(result);

    if (result?.statusCode === 200) {
      setisLoggedIn(true);
      setisLoading(false);
      setuser(result?.response);
    } else {
      setisLoading(false);
      setisLoggedIn(false);
      setuser(null);
    }
  };

  useEffect(() => {
    fetch_logged_in_user();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setuser,
        setisLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

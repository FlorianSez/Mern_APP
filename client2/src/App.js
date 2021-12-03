import { React, useEffect, useState } from "react";
import { UserContext } from "./components/AppContext";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";

import axios from "axios";
import { getUser } from "./actions/user.action";
// import { getAllUsers } from "./actions/users.action";

function App() {
  const [user, setUid] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          //console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("No Token " + err));
    };
    fetchToken();

    if (user) {
      dispatch(getUser(user));
    }
  });

  return (
    <UserContext.Provider value={user}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;

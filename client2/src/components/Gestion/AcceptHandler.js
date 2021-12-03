import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  // getAllUsers,
  updateAccept,
  updateReject,
} from "../../actions/user.action";
// import { getAllUsers } from "../../actions/users.action";

const AcceptHandler = ({ idToAccept }) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(updateAccept(idToAccept, true));
    dispatch(updateReject(idToAccept, false));
  };

  useEffect(() => {});

  return (
    <>
      <button className="button1" onClick={handleAccept}>
        &#x2714;
      </button>
    </>
  );
};

export default AcceptHandler;

import React from "react";
import { useDispatch } from "react-redux";
import { updateAccept, updateReject } from "../../actions/user.action";

const RejectHandler = ({ idToReject }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(updateAccept(idToReject, false))
        dispatch(updateReject(idToReject, true));
    };

  return (
      <>
    <button onClick={handleDelete}>
      &#x2717;
    </button>
    </>
  );
};

export default RejectHandler;

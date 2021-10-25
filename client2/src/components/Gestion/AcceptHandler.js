import { useDispatch, useSelector } from "react-redux";
import { updateAccept, updateReject } from "../../actions/user.action";

const AcceptHandler = ({ idToAccept }) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleAccept = () => {
      dispatch(updateAccept(idToAccept, true));
      dispatch(updateReject(idToAccept, false))
  };

  return (
    <>
      <button className="button1" onClick={handleAccept}>
        &#x2714;
      </button>
    </>
  );
};

export default AcceptHandler;

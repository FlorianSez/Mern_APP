import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
// export const UPDATE_ACCEPT = "UPDATE_ACCEPT";
// export const UPDATE_REJECT = "UPDATE_REJECT";

export const getAllUsers = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/`,
    })
      .then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// export const updateAccept = (idCible, accept) => {
//   return (dispatch) => {
//     return axios({
//       method: "put",
//       url: `${process.env.REACT_APP_API_URL}api/user/` + idCible,
//       data: {
//         accept,
//       },
//     })
//       .then((res) => {
//         dispatch({ type: UPDATE_ACCEPT, payload: accept });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const updateReject = (idCible, reject) => {
//   return (dispatch) => {
//     return axios({
//       method: "put",
//       url: `${process.env.REACT_APP_API_URL}api/user/` + idCible,
//       data: {
//         reject,
//       },
//     })
//       .then((res) => {
//         dispatch({ type: UPDATE_REJECT, payload: reject });
//       })
//       .catch((err) => console.log(err));
//   };
// };

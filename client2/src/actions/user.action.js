import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PHOTO = "UPLOAD_PHOTO";
export const UPDATE_PRENOM = "UPDATE_PRENOM"
export const UPDATE_NOM = "UPDATE_NOM";
export const UPDATE_ACCEPT = "UPDATE_ACCEPT";
export const UPDATE_REJECT = "UPDATE_REJECT";

export const getUser = (user) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${user}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPhoto = (data, user) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${user}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PHOTO, payload: res.data });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePrenom = (user, prenom) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/user/`+ user,
            data: {
                prenom
            }
        })
        .then((res)=>{
            dispatch({type: UPDATE_PRENOM, payload: prenom})
        })
        .catch((err)=> console.log(err))
    }
}

export const updateNom = (user, nom) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/user/`+ user,
            data: {
                nom
            }
        })
        .then((res)=>{
            dispatch({type: UPDATE_NOM, payload: nom})
        })
        .catch((err)=> console.log(err))
    }
}

export const updateAccept = (idCible, accept) => {
  return (dispatch) => {
    return axios ({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/`+ idCible,
      data: {
        accept
      }
    })
    .then((res) => {
      dispatch({type: UPDATE_ACCEPT, payload: accept})
    })
    .catch((err)=>console.log(err))
  }
}

export const updateReject = (idCible, reject) => {
  return (dispatch) => {
    return axios ({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/`+ idCible,
      data: {
        reject
      }
    })
    .then((res) => {
      dispatch({type: UPDATE_REJECT, payload: reject})
    })
    .catch((err)=>console.log(err))
  }
}
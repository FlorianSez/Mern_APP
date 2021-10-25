import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto } from "../../actions/user.action";
import '../../style/Update.css'

const UploadPhoto = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  const handlePhoto = (e) => {
      e.preventDefault()
      const data = new FormData()
      data.append('name', userData.prenom)
      data.append('userId', userData._id)
      data.append('file', file)

      dispatch(uploadPhoto(data, userData._id))
  };

  return (
    <form action="" onSubmit={handlePhoto} className="upload-photo">
      <label htmlFor="file" style={{fontWeight: 'bold'}}>Modifier l'image</label>
      <br/>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      ></input>
      <br/>
      <input type='submit' value='Envoyer'/>
    </form>
  );
};

export default UploadPhoto;

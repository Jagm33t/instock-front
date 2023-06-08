import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../Button/Button";
import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";
import publish from "../../assets/icons/publish.svg";
import resizeTextarea from "../../utils/resizetextarea";
import "./UploadForm.scss";

function UploadForm({ handleClick, formType }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const apiVideosURL = process.env.REACT_APP_API_SERVER;

  const postNewVideo = (newVideo) => {
    axios
      .post(`${apiVideosURL}`, {
        title: newVideo.title,
        description: newVideo.description,
        image: newVideo.image,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Create a handler for title input
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  // Create a handler for description textarea
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  // Check if the form is valid
  const isFormValid = () => {
    if (!title || !description) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      postNewVideo({
        title: event.target.title.value,
        description: event.target.description.value,
        image: "image8.jpg",
      });
      alert("New video submitted successfully.");
      navigate("/");
    } else {
      alert("Failed to submit, you have some errors in your form");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label className="form__thumbnail">
          Video Thumbnail
          <div className="form__thumbnail-img-container">
            <img
              className="form__thumbnail-img"
              src={uploadVideoPreview}
              alt="preview "
            />
          </div>
        </label>
        <div className="form__text-container">
          <label className="form__text-title-label" htmlFor="title">
            Title Your Video
          </label>
          <input
            className="form__text-title-input"
            type="text"
            name="title"
            id="title"
            placeholder="Add a title to your video"
            onChange={handleChangeTitle}
            value={title}
          />
          <label className="form__text-description-label" htmlFor="description">
            Add a Video Description
          </label>
          <textarea
            name="description"
            id="description"
            className="form__text-description-textarea"
            placeholder="Add a description to your video"
            onChange={handleChangeDescription}
            value={description}
            onInput={() => resizeTextarea("description")}
          ></textarea>
        </div>
      </fieldset>
      <div className="form__buttons">
        <Button
          icon={publish}
          text="Publish"
          type="submit"
          disabled={!isFormValid()}
        />
        <Button
          text="Cancel"
          type="submit"
          handleClick={handleClick}
          addClassName={"btn__style--cancel"}
        />
      </div>
    </form>
  );
}

export default UploadForm;

import { useState, useRef } from "react";
import "./ImageSearch.css"
import "./Loader.css"

import cross_icon from "../../assets/cross.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { searchImage, searchImageURL, setUploading } from "../../redux/actions/helpAction";

const ImageSearch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(state => state.helpReducer.isUploading)

  const [URLInput, setURLInput] = useState("")

  const [uploadError, setUploadError] = useState(0);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removePhoto = (event) => {
    setFile(null);
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]
    setFile(file)
    setImgUrl(URL.createObjectURL(file))
  };

  const handlePickImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0]
    setFile(file)
    setImgUrl(URL.createObjectURL(file))
  };
  
  // send files to the server // learn from my other video
  const handleSearchImage = async () => {
    setUploadError(0)
    
    dispatch(setUploading(true))
    try {
        await Promise.all([dispatch(searchImage(file))])
    } catch (err) {
        setUploadError(err.response.status)
    } 
    dispatch(setUploading(false))

    navigate("/suggested")
  };

  const handleSearchURL = async () => {
    setUploadError(0)
    
    dispatch(setUploading(true))
    try {
        await Promise.all([dispatch(searchImageURL(URLInput))])
    } catch (err) {
        if (err.response){
            setUploadError(err.response.status)
        } else {
            setUploadError(1)
        }
    } 
    dispatch(setUploading(false))

    navigate("/suggested")
  };

  const handleURLInputChange = (event) => {
    setURLInput(event.target.value)
  }

  const isValidURL = (url) => {
    return url != ""
  }


  return (
    <div className="imagesearch-page">
      
        <div className="imagesearch-container">
            {   
                isLoading &&
                <div class="loading-overlay">
                    <div class="loader" 
                    // style={{ 
                    //     margin: "auto", 
                    // }}
                    />
                </div>
            }
            <div className="title">
               AI Product Search
            </div>
            <div className="description">
               Search for a product from our catalogue from <br/>an image, using a JPG, PNG file, or URL.
            </div>
            <div className="image-upload">
                <div 
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                {
                    file && 
                    <div className="image-preview-wrapper">
                        <button onClick={removePhoto} className="removePhotoButton">
                            <img className="removePhotoIcon" src={cross_icon} alt=""/>
                        </button>
                        <img src={imgUrl} className="image-preview">
                        </img>
                    </div>

                    ||
                    <div className="upload-wrapper">
                    <div className="drop-text-1">Drag and Drop</div>
                    <div className="drop-text-2">Or</div>
                    <input 
                        type="file"
                        onChange={handlePickImage}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                    />
                    <button className="select-button" onClick={() => inputRef.current.click()}>Select Image</button>
                    </div>
                }
                </div>
                <button className="select-button upload-button" disabled={!file || isLoading} onClick={handleSearchImage}>Image Search</button>
                {
                    uploadError == 503 && <div className="warning">There was an error with the search. Please try again.</div>
                    || uploadError == 406 && <div className="warning">The image provided is not appropriate.</div>
                    || uploadError != 0 && <div className="warning">There was an unknown error with code: {uploadError}</div>
                }
                <div className="border"/>
            </div>
            <div className="image-upload">
                <div className="url-row">
                    <input className="text-field" type="text" id="image-url-search" onChange={handleURLInputChange} placeholder="Image URL" />
                    <button className="select-button upload-button-url" disabled={isLoading || !isValidURL(URLInput)} onClick={handleSearchURL} >Image URL Search</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ImageSearch;
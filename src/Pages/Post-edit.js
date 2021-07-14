import React, { useState, useEffect } from "react";
import { AddPhotoAlternate } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useBlogContext } from "../Context/Context";
import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";

const PostEdit = (props) => {
    const [base64, setBase64] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modal, setModal] = useState(false);
    const { disableButton, enableButton, token, isButtonDisabled } =
        useBlogContext();

    const history = useHistory();

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (reader.readyState === 2) {
                setBase64(reader.result);
            }
        };
        if (!e.target.files[0]) {
            return;
        }
        const filetype = e.target.files[0].type;
        if (
            filetype === "image/jpg" ||
            filetype === "image/jpeg" ||
            filetype === "image/png"
        ) {
            reader.readAsDataURL(e.target.files[0]);
            setFile(e.target.files[0]);
        } else {
            alert("Only PNG, JPG, JPEG type accepted");
        }
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    useEffect(() => {
        if (title.length > 10 && content.length > 50 && base64) {
            enableButton();
        } else {
            disableButton();
        }
    }, [title, content, base64, enableButton, disableButton]);

    const handleSubmitPost = (e) => {
        setModal(true);
        e.preventDefault();
        const bytes = file.size;
        const megabytes = bytes / 1024 / 1024;
        if (megabytes > 3) {
            return alert("File must be less than 3MB");
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("img", file);
        axios
            .post("/admin/edit-post", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((result) => {
                history.push("/");
                setModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar onClick={handleSubmitPost} publishing={modal} />
            <div className="create-post-wrapper">
                <div className="mobile-btn-flex">
                    <button
                        onClick={handleSubmitPost}
                        disabled={isButtonDisabled || modal}
                        className="btn btn-mobile"
                    >
                        {modal ? "Publishing..." : "Publish"}
                    </button>
                </div>
                <form className="post-form container">
                    <div className="post-content-wrapper">
                        <div className="img-upload-group">
                            {base64 && (
                                <img className="img" src={base64} alt="" />
                            )}
                            <label htmlFor="img">{<AddPhotoAlternate />}</label>
                            <input
                                type="file"
                                name="img"
                                id="img"
                                className="imgUpload"
                                style={{ display: "none" }}
                                onChange={handleImage}
                            />
                        </div>
                        <textarea
                            type="text"
                            name="title"
                            placeholder="Title"
                            maxLength="80"
                            className="title"
                            onChange={handleTitle}
                        ></textarea>
                        <textarea
                            className="content"
                            placeholder="Add Content . . . ."
                            name="content"
                            maxLength="5000"
                            id="content"
                            cols="30"
                            rows="25"
                            onChange={handleContent}
                        ></textarea>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostEdit;

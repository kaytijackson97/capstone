import { useState } from "react";
import { addPost } from "../../services/post-api";

function AddPost() {
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");

    const handleSubmit = (event) => {
        const newPost = {
            planterId: 1,
            plantId: 1,
            gardenId: 1,
            caption: caption,
            photo: photo,
            datetimePosted: "2021-05-18T06:43:18",
            likeCount: 0
        }

        addPost(newPost);
    }

    const postStyle = {
        "width": "1000px"
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3" style={postStyle}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                            <input type="text" size="850px" placeholder="Show off your plant!" onChange={(event) => setCaption(event.target.value)}></input>
                        </div>
                        {/* <div>
                            <button type="button">Add Plant</button>
                        </div> */}
                        <div className="row mt-3">
                            <input type="text" placeholder="Add photo url" onChange={(event) => setPhoto(event.target.value)}></input>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button type="submit" className="btn btn-success mt-3">Add Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
import { useContext, useState } from "react";
import CurrentUser from "../contexts/CurrentUser";

function AddPost({addPostToArray}) {
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");
    const auth = useContext(CurrentUser);
    const now = new Date();

    const handleSubmit = async () => {
        const nowAsLocalDateTime = 
                now.getFullYear() + "-" + 
                ("0" + (now.getMonth() + 1)).slice(-2) + "-" + 
                ("0" + now.getDate()).slice(-2) + "T" + 
                now.getHours() + ":" + 
                now.getMinutes() + ":" + 
                now.getSeconds();

        const newPost = {
            username: auth.currentUser.username,
            plantId: 1,
            gardenId: 1,
            caption: caption,
            photo: photo,
            datetimePosted: nowAsLocalDateTime,
            likeCount: 0
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(newPost)
        };

        fetch("http://localhost:8080/api/post", init)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED");
            }
            return response.json;
        })
        .then(() => addPostToArray(newPost));
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
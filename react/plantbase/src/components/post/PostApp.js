import { useEffect, useState } from "react";
import { findAllPosts, findPostById } from "../../services/api";
import Post from "./Post";

function PostApp() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        findPostById(1)
            .then((data) => setPost(data))
            .catch(console.log)
    }, [1])

    return (
        <div>
            <Post post={post}/>
        </div>
    );
}

export default PostApp;
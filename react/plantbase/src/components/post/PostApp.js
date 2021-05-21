import { useEffect, useState } from "react";
import { findAllPosts } from "../../services/post-api";
import PostList from "./PostList";
import AddPost from "./AddPost";

function PostApp() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        findAllPosts()
            .then((data) => setPosts(data))
            .catch(console.log)
    }, [])

    return (
        <div>
            <AddPost />
            <PostList posts={posts}/>
        </div>
    );
}

export default PostApp;
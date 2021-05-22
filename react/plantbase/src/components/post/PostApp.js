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
    }, []);

    function deletePostByPostId(postId) {
        const newPosts = [];
        for(const post of posts ) {
            if (post.postId !== postId) {
                newPosts.push(post);
            }
        }

        setPosts(newPosts);
    }

    return (
        <div>
            <AddPost />
            <PostList posts={posts} deletePostByPostId={deletePostByPostId}/>
        </div>
    );
}

export default PostApp;
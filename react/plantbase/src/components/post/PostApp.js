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

    function editPostByPostId(post) {
        const newPosts = [];
        for(const p of posts ) {
            if (p.postId !== post.postId) {
                newPosts.push(p);
            } else {
                newPosts.push(post)
            }
        }

        setPosts(newPosts);
    }

    function addPostToArray(post) {
        // console.log(post);
        const newPosts = [...posts, post];
        console.log(newPosts);
        setPosts(newPosts);
    }

    return (
        <div>
            <AddPost addPostToArray={addPostToArray}/>
            <PostList posts={posts} deletePostByPostId={deletePostByPostId} editPostByPostId={editPostByPostId} addPostToArray={addPostToArray}/>
        </div>
    );
}

export default PostApp;
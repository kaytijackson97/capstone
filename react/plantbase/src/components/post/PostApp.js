import { useContext, useEffect, useState } from "react";
import { findAllPosts } from "../../services/post-api";
import PostList from "./PostList";
import AddPost from "./AddPost";
import CurrentUser from "../contexts/CurrentUser";
import { findPlantsByMyGardenId } from "../../services/plant-api";

function PostApp({}) {
    const [posts, setPosts] = useState([]);
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    useEffect(() => {
        // findAllPosts()
        //     .then((data) => setPosts(data))
        //     .catch(console.log)
        fetch(`${process.env.REACT_APP_API_URL}/api/post`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Plants fetch failed.")
                }
                return response.json();
            })
            .then(json => setPosts(json))
            .catch(console.log);
            // console.log(posts);
    }, []);

        // console.log(posts);
    // }, []);

    useEffect(() => {
        findPlantsByMyGardenId(auth.currentUser.myGarden.myGardenId)
            .then((data) => setPlants(data))
            .catch(console.log)
    }, [auth.currentUser.myGarden.myGardenId]);

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
        const newPosts = [post, ...posts];
        setPosts(newPosts);
    }

    return (
        <div>
            <AddPost addPostToArray={addPostToArray} plants={plants}/>
            <PostList posts={posts} plants={plants} deletePostByPostId={deletePostByPostId} editPostByPostId={editPostByPostId} addPostToArray={addPostToArray}/>
        </div>
    );
}

export default PostApp;